import type { SentimentDTO, SentimentDTOLite } from "@repo/dtos";
import { memo, type RefObject } from "react";
import { TrackCard } from "./TrackCard";
import type H5AudioPlayer from "react-h5-audio-player";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import { format, formatDate } from "date-fns";
import { Link } from "react-router-dom";

export const SentimentCard = memo(
  ({ sentiment }: { sentiment: SentimentDTOLite }) => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {!sentiment.isRead ? (
              <div className="flex items-center gap-2">
                <div className="size-4 rounded-full bg-red-400" />
                <p>Unread Sentiment</p>
              </div>
            ) : (
              <p className="line-clamp-2">{sentiment.sentiment}</p>
            )}
          </CardTitle>
          <CardDescription>
            {format(sentiment.createdAt, "MM/dd/yyyy")}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link to={`/sentiment/${sentiment._id}`}>View</Link>
        </CardFooter>
      </Card>
    );
  }
);
