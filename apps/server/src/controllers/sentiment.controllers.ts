import {
  IsSentimentReadSchema,
  SentimentSchema,
  UsernameSchema,
} from "@repo/validators";
import type { RequestHandler } from "express";
import { NotFoundError } from "../errors/AppErrors";
import Sentiment from "../models/sentiments/sentiments";
import axios from "axios";
import type {
  GetASingleSentimentResponse,
  GetMySentimentsResponse,
  ITunesTrack,
  SentimentDTO,
  SentimentDTOLite,
} from "@repo/dtos";
import User from "../models/user/user";
import { ObjectIdSchema, QueryParamSchema } from "../validators/validators";


export const getASingleSentiment: RequestHandler = async(req, res) => {
  const sentimentId = ObjectIdSchema.parse(req.params.sentimentId);
  const myId = ObjectIdSchema.parse(req.myId);

  const sentiment = await Sentiment.findOne({ _id: sentimentId, for: myId }).orFail(new NotFoundError('Sentiment not found.')).lean();

     const track = (await axios.get<{ results: ITunesTrack[]}>(`https://itunes.apple.com/lookup?id=${sentiment.trackId}`)).data.results[0];

     if(!track){
      throw new NotFoundError(`Track ${sentiment.trackId} not found.`);
     }

     if(!sentiment.isRead){
        sentiment.isRead = true;
        await Sentiment.findByIdAndUpdate(String(sentiment._id), { isRead: true })
     }

     const response: GetASingleSentimentResponse = {
       sentiment: {
          for: String(sentiment.for),
          sentiment: sentiment.sentiment,
          trackId: sentiment.trackId,
          isRead: sentiment.isRead,
          _id: String(sentiment._id),
          track,
          createdAt: sentiment.createdAt
       },
       success: true
     }

     return res.status(200).json(response)

}

export const getMySentiments: RequestHandler = async (req, res) => {
  const myId = ObjectIdSchema.parse(req.myId);
  const isRead = IsSentimentReadSchema.parse(req.query.isRead);
  const { skip, limit, page } = QueryParamSchema.parse(req.query);
  await User.findById(myId).orFail(new NotFoundError("User not found."));
  const query: any = {
    for: myId,
  };
  if (isRead !== null) {
    query.isRead = isRead;
  }
  const [sentiments, totalSentiments, hasUnreadSentiments] = await Promise.all([
    Sentiment.find<SentimentDTO>(query)
      .skip(skip)
      .limit(limit)
      .lean<SentimentDTO[]>(),
    Sentiment.countDocuments(query),
    !!( Sentiment.exists({ ...query, isRead: false }))
  ]);
  

  const nextPage = totalSentiments > page - 1 * limit ? page + 1 : page;
  const response: GetMySentimentsResponse = {
    success: true,
    hasUnreadSentiments,
    sentiments,
    totalSentiments,
    nextPage,
  };

  return res.status(200).json(response);
};

export const createSentiment: RequestHandler = async (req, res) => {
  const { trackId, sentiment } = SentimentSchema.parse(req.body.sentimentForm);
  const username = UsernameSchema.parse(req.body.username);

  const user = await User.findOne({ username })
    .orFail(new NotFoundError(`User ${username} not found.`))
    .lean();
  const track = await axios.get<{ results: ITunesTrack[] }>(
    `https://itunes.apple.com/lookup?id=${trackId}`
  );
  if (track.data.results.length === 0) {
    throw new NotFoundError(`Track ${trackId} not found.`);
  }
  const newSentiment = await new Sentiment({
    trackId,
    sentiment,
    for: String(user._id),
  }).save();

  return res.status(200).json({
    success: true,
    message: `Your sentiment was succesfully sent to ${username}!`,
    newSentiment,
  });
};
