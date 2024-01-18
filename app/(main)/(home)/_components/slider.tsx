"use client";

import Link from "next/link";
import * as React from "react";
import Image from "next/image";
import { Billboard } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface SliderProps {
  billboard?: Billboard[];
}

export const Slider = ({ billboard }: SliderProps) => {
  return (
    <Carousel
      className="w-full max-w-screen-md"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {billboard?.map((item, index) => (
          <CarouselItem key={index}>
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <Link href={item.url}>
                <Image
                  src={item.thumbnail}
                  alt={item.thumbnail}
                  fill
                  className="rounded-md object-cover"
                />
              </Link>
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="lg:block hidden">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
};

export function Loading() {
  return (
    <AspectRatio ratio={16 / 9} className="bg-muted">
      <Image
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        alt="Photo by Drew Beamer"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="rounded-md object-cover"
      />
    </AspectRatio>
  );
};
