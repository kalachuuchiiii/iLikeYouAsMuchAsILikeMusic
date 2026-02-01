import type { GetMySentimentsResponse } from "@repo/dtos";
import { useApi } from "@src/hooks/useApi";
import { useAppSelector } from "@src/hooks/useRedux";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useRef, useState, type RefObject } from "react";
import { TrackCard } from "../components/ui/TrackCard";
import type H5AudioPlayer from "react-h5-audio-player";
import { SentimentCard } from "../components/ui/SentimentCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@src/components/ui/select";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@src/components/ui/empty";

const SentimentInbox = () => {
  const [isRead, setIsRead] = useState<boolean | null>(null);
  const { accessToken } = useAppSelector((state) => state.auth);
  const currentlyPlayingRef = useRef<H5AudioPlayer | null>(null);
  const api = useApi();

  const { data } = useInfiniteQuery({
    queryKey: ["inbox", isRead],
    queryFn: async ({ pageParam }) => {
      const res = await api.get<GetMySentimentsResponse>(
        `/sentiments/me/list?page=${pageParam}&limit=${10}&isRead=${isRead}`
      );
      return res.data;
    },
    getNextPageParam: (res) => res.nextPage,
    initialPageParam: 1,
    enabled: !!accessToken,
  });

  const handleChangeIsReadFilter = (val: string) => {
    setIsRead(val === "false" ? false : val === "true" ? true : null);
  };

  const sentiments = data?.pages.flatMap((f) => f.sentiments) ?? [];
  const totalSentiments = data?.pages[0].totalSentiments ?? 0;

  return (
    <div>
      <header className="shadows-into-light-regular">
        <h1 className=" text-4xl lg:text-6xl">Your inbox</h1>
        <h2 className="text-2xl lg:text-3xl">Sentiments for you</h2>
      </header>
      <main className="my-4">
       <div className="flex gap-4 items-center">
         <Select onValueChange={handleChangeIsReadFilter} defaultValue="null">
          <SelectContent>
            <SelectGroup>
              <SelectItem value="false">Unread</SelectItem>
              <SelectItem value="true">Read</SelectItem>

              <SelectItem value="null">All</SelectItem>
            </SelectGroup>
          </SelectContent>
          <SelectTrigger>
            <p>({totalSentiments}) </p>  <SelectValue />
          </SelectTrigger>
        </Select>{" "}
      
       </div>
        {
          totalSentiments > 0 ?  <main className=" my-10 gap-2 grid  grid-cols-2">
          {sentiments.map((s) => (
            <SentimentCard sentiment={s} />
          ))}
        </main> : <Empty>
          <EmptyHeader>
            <EmptyTitle>
              Your inbox is empty
            </EmptyTitle>
            <EmptyDescription>
              share your link to receive sentiments
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
        }
      </main>
    </div>
  );
};

export default SentimentInbox;
