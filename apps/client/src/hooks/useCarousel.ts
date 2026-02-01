import type { CarouselApi } from "@src/components/ui/carousel";
import { useEffect, useState } from "react";

export const useCarousel = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    if (!api) {
      return;
    }
      api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api]);

  return {
    setApi,
    index: current,
  };
};
