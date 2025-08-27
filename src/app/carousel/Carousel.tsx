"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  items: React.ReactNode[];
}

export function Carousel({ items }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = React.useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative w-full overflow-hidden">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {items.map((item, i) => (
            <div key={i} className="min-w-0 flex-[0_0_100%] px-2">
              {item}
            </div>
          ))}
        </div>
      </div>

      <Button
        size="icon"
        variant="outline"
        onClick={scrollPrev}
        className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full shadow-md"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant="outline"
        onClick={scrollNext}
        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full shadow-md"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
