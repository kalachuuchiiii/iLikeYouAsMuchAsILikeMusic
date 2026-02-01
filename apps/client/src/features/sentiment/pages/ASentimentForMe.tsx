import type { SentimentDTO } from "@repo/dtos";
import { useApi } from "@src/hooks/useApi";
import { useAppSelector } from "@src/hooks/useRedux";
import { useQuery } from "@tanstack/react-query";
import React, { useRef, type RefObject } from "react";
import { useParams } from "react-router-dom";
import { TrackCard } from "../components/ui/TrackCard";
import type H5AudioPlayer from "react-h5-audio-player";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@src/components/ui/card";
import { format } from "date-fns";

const ASentimentForMe = () => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const { sentimentId = "" } = useParams();
  const currentlyPlayingRef = useRef<H5AudioPlayer | null>(null);
  const api = useApi();

  const { data: sentiment } = useQuery({
    queryFn: async () => {
      const res = await api.get<{ sentiment: SentimentDTO }>(
        `/sentiments/me/single/${sentimentId}`
      );
      return res.data.sentiment;
    },
    queryKey: ["sentiment", sentimentId],
    enabled: !!accessToken && !!sentimentId,
  });

  if (!sentiment) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="p-2">
      <TrackCard
        track={sentiment.track}
        currentlyPlayingRef={currentlyPlayingRef}
      />
      <CardContent className="shadows-into-light-regular ">
        <CardDescription className="text-2xl min-h-40 ">
          {sentiment.sentiment}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4">
        <CardDescription>
          Created at {format(sentiment.createdAt, "MM/dd/yyyy")}
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default ASentimentForMe;
