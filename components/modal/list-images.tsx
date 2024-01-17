/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Image } from "@/types";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface ListImagesProp {
  data?: Image[] | undefined;
}

export const ListImages = ({ data }: ListImagesProp) => {
  return (
    <Carousel
      className="w-full max-w-xs"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {data?.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <img src={item.url} alt={item.id} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
