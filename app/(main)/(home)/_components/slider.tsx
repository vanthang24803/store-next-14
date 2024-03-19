/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import * as React from "react";
import { Billboard } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
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
          delay: 1500,
        }),
      ]}
    >
      <CarouselContent>
        {billboard?.map((item, index) => (
          <CarouselItem key={index}>
            <Link href={item.url}>
              <img
                src={item.thumbnail}
                alt={item.thumbnail}
                loading="lazy"
                className="rounded-md object-fill w-full"
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
