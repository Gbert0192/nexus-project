"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface CarouselProps {
  images: string[];
  alt?: string;
}

export function Carousel({ images, alt = "carousel image" }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = React.useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const [vh, setVh] = React.useState(0);

  React.useEffect(() => {
    const pxToVh = (px: number) => (px / window.innerHeight) * 100;
    setVh(pxToVh(400));

    const handleResize = () => setVh(pxToVh(672));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="relative mx-auto w-[88vw] overflow-hidden rounded-3xl"
      style={{ height: `${vh}vh` }}
    >
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {images.map((src, i) => (
            <div key={i} className="relative h-full min-w-0 flex-[0_0_100%]">
              <Image
                src={src}
                alt={`${alt} ${i + 1}`}
                fill
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="ghost"
        onClick={scrollPrev}
        className="absolute top-1/2 left-2 h-10 w-10 -translate-y-1/2 rounded-md bg-black/40 text-white shadow-md hover:bg-black/40 hover:text-white"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        onClick={scrollNext}
        className="absolute top-1/2 right-2 h-10 w-10 -translate-y-1/2 rounded-md bg-black/40 text-white shadow-md hover:bg-black/40 hover:text-white"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
}
