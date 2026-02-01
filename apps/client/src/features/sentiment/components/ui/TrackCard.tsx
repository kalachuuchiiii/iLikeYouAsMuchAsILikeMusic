import type { ITunesTrack } from "@repo/dtos";
import { memo, useRef, type RefObject } from "react";
import { Button } from "@src/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import { RiAppleLine } from "react-icons/ri";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import type H5AudioPlayer from "react-h5-audio-player";

interface TrackCardProps {
  track: ITunesTrack;
  currentlyPlayingRef: RefObject<H5AudioPlayer | null>;
}

export const TrackCard = memo(
  ({ track, currentlyPlayingRef }: TrackCardProps) => {
    const playerRef = useRef<H5AudioPlayer | null>(null);

    const handlePlay = () => {
      if (
        currentlyPlayingRef?.current &&
        currentlyPlayingRef.current !== playerRef.current
      ) {
        currentlyPlayingRef.current.audio.current?.pause(); // ✅ Pause underlying audio
      }
      if (currentlyPlayingRef && playerRef.current) {
        currentlyPlayingRef.current = playerRef.current;
      }
    };

    return (
      <Card className="rounded-xl h-full space-y-2 ">
        <header className="w-full md:h-50 h-65 flex  relative">
         <div className="grid grid-cols-1 grid-rows-1 p-4 w-full h-full place-content-center">
           <img
            className="object-cover blur-3xl w-full h-full row-start-1  row-span-1 col-start-1 col-span-1"
            src={track.artworkUrl100}
          />
       
          <main className="row-start-1 md:px-10 z-20  md:gap-5  row-span-1 md:flex col-start-1 col-span-1">
               <img
            className="object-cover z-20 rounded-lg size-40   bottom-4 left-10"
            src={track.artworkUrl100}
          />
              <div className=" w-full ">
            <div className="mix-blend-overlay text-white">
              <CardTitle className="md:text-2xl text-lg  text-background text-white line-clamp-2">
                {track.trackName}
              </CardTitle>
              <CardDescription className="line-clamp-2 md:text-base text-xs text-white">
                <a href={track.collectionViewUrl} target="_blank">
                  {track.collectionName}
                </a>
              </CardDescription>
              <CardDescription className="line-clamp-2 md:text-base text-xs text-white">
                <a href={track.artistViewUrl} target="_blank">
                  {track.artistName}
                </a>
              </CardDescription>
            </div>
            <footer className="my-4 mix-blend-overlay">
              <a
                target="_blank"
                className="flex items-center gap-2"
                href={track.trackViewUrl}
              >
                <button className="bg-transparent md:text-base text-xs truncate text-white font-semibold cursor-pointer outline-white/50 rounded flex items-center gap-2">
                  <RiAppleLine /> Open in Apple Music
                </button>
              </a>
            </footer>
          </div>
          </main>
         </div>
        
        </header>

        <CardFooter className="space-x-2">
          <AudioPlayer
            loop={true}
            src={track.previewUrl}
            onPlay={handlePlay}
            ref={playerRef} // ✅ Use this ref
            style={{ backgroundColor: "transparent" }}
          />
        </CardFooter>
      </Card>
    );
  }
);
