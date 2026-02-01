import type { ITunesTrack, SentimentDTO, SentimentForm } from "@repo/dtos";
import { Card, CardDescription, CardFooter } from "@src/components/ui/card";

import { Textarea } from "@src/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { useParams } from "react-router-dom";
import { TrackCard } from "../components/ui/TrackCard";
import { LucideSearch, Music2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@src/components/ui/carousel";
import { useDebounce } from "@src/hooks/useDebounce";
import type H5AudioPlayer from "react-h5-audio-player";
import { useCarousel } from "@src/hooks/useCarousel";
import {
  Item,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "@src/components/ui/item";
import { useSentimentActions } from "../hooks/useSentimentActions";
import { Button } from "@src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@src/components/ui/dialog";
import { Empty, EmptyDescription, EmptyHeader } from "@src/components/ui/empty";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@src/components/ui/input-group";
import { CiApple } from "react-icons/ci";
import { RiAppleLine } from "react-icons/ri";
import { format } from "date-fns";
const defaultTerms = [
  "radiohead",
  "niki",
  "coldplay",
  "the paramore",
  "the 1974",
  "clairo",
  "beabadobee",
  "laufey",
];

const randInt = Math.floor(Math.random() * defaultTerms.length);

const CreateASentiment = () => {
  const { username = "" } = useParams();
  const [term, setTerm] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [totalTracks, setTotalTracks] = useState(1);

  const currentlyPlayingRef = useRef<H5AudioPlayer | null>(null);
  const { index, setApi } = useCarousel();
  const debouncedTerm = useDebounce(term, 1000);

  const { createSentiment, isCreatingSentiment } = useSentimentActions();

  const { data: tracks = [], isFetching: isFetchingTracks } = useQuery({
    queryFn: async () => {
      const isEmpty = debouncedTerm.trim() === "";

      const url = isEmpty
        ? `https://itunes.apple.com/search?term=${encodeURIComponent(defaultTerms[randInt])}&media=music&limit=30`
        : `https://itunes.apple.com/search?term=${encodeURIComponent(debouncedTerm)}&media=music&limit=30`;

      const res = await axios.get<{
        results: ITunesTrack[];
        resultCount: number;
      }>(url);
      setTotalTracks(res.data.resultCount);

      return res.data.results;
    },
    queryKey: ["tracks", debouncedTerm],
  });

  const selectedTrack = useMemo(() => tracks[index - 1], [index, tracks]) ?? {};

  const sentimentForm: SentimentForm = useMemo(
    () => ({ trackId: selectedTrack?.trackId, sentiment }),
    [selectedTrack, sentiment]
  );

  const handleChangeSentiment = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setSentiment(e.target.value);
    },
    []
  );

  return (
    <main>
      <header className="shadows-into-light-regular">
        <h1 className=" text-4xl lg:text-6xl">Create a sentiment</h1>
        <h2 className="text-2xl lg:text-3xl">for {username}</h2>
      </header>
      <Card className="md:py-4 py-2 px-3 md:px-6  my-6 gap-0">
        <div className=" w-full gap-10 overflow-x-auto">
         <div className="flex items-center gap-5">
          <p className="font-semibold flex gap-2 items-center truncate">
            <RiAppleLine className="size-8" />
            Tracks</p>
            <InputGroup className="my-2 w-full ml-auto flex items-center gap-2">
         <InputGroupAddon>
         <LucideSearch />
         </InputGroupAddon>
            <InputGroupInput
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="border-b-2 rounded outline-none w-full p-2"
              placeholder="Search"
            />
          </InputGroup>
         </div>
          <div className="overflow-x-hidden my-10">
            {totalTracks > 0 && !isFetchingTracks && tracks.length > 0 ? (
              <Carousel setApi={setApi}>
                <CarouselContent>
                  {tracks.map((track) => (
                    <CarouselItem key={track.trackId}>
                      <TrackCard
                        currentlyPlayingRef={currentlyPlayingRef}
                        track={track}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselNext />
                <CarouselPrevious />
              </Carousel>
            ) : <Empty>
               <EmptyHeader>
                <EmptyDescription>
                   No results found
                </EmptyDescription>
               </EmptyHeader>
              </Empty>}
          </div>
        </div>
        
        <main>
          <Textarea
            value={sentiment}
            onChange={handleChangeSentiment}
            placeholder="Your sentiment..."
            className="min-h-20 shadows-into-light-regular focus:disabled lg:text-2xl w-full outline-none h-full"
          />
        </main>
        {selectedTrack && (
          <Item>
            <ItemHeader>
              <ItemTitle>
                <Music2 size={20} />
                <p>{selectedTrack.trackName}</p>
              </ItemTitle>
              <ItemDescription>{selectedTrack.artistName}</ItemDescription>
            </ItemHeader>
          </Item>
        )}

        <CardFooter className="mt-10 mb-5 flex justify-end">
           <Dialog>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create this sentiment for @{username}?</DialogTitle>
              <DialogDescription>
                {selectedTrack.trackName} - {selectedTrack.artistName}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex items-center w-full justify-end">
              <Button
                onClick={() => createSentiment({ sentimentForm, username })}
                disabled={isCreatingSentiment}
                className="ilym-button"
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
          <DialogTrigger disabled = {sentiment.trim() === ''}>
            <Button  className="ilym-button">Send to {username}</Button>
          </DialogTrigger>
        </Dialog>
        </CardFooter>
        <CardDescription >
          {format(new Date(), 'MM/dd/yyyy')}
        </CardDescription>
      </Card>
     
    </main>
  );
};

export default CreateASentiment;
