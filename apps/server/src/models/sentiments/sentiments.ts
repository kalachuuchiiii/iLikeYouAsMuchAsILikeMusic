import type { ITunesTrack } from "@repo/dtos";
import { model, Schema } from "mongoose";
import type { SentimentModel } from "../../types/sentiment";


export const sentimentSchema = new Schema(
  {
    trackId: { type: Number, required: true },
    sentiment: { type: String, required: true },
    for: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isRead: {
        type: Boolean,
        default: false,
    }
  },
  { timestamps: true } 
);

const Sentiment = model<SentimentModel>('Sentiment', sentimentSchema);

export default Sentiment;