/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { subBillboard } from "@/constant";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

import * as React from "react";

import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export const BillboardHeader = () => {
  return (
    <>
      <div className="lg:flex hidden flex-col space-y-4">
        {subBillboard.map((item, index) => (
          <div className="w-[360px] overflow-hidden rounded-md" key={index}>
            <AspectRatio ratio={26 / 9} className="bg-muted">
              <Link href={item.url}>
                <Image
                  src={item.thumbnail}
                  alt={item.name}
                  fill
                  className="rounded-md w-full object-cover hover:scale-105 transform transition-transform duration-500"
                />
              </Link>
            </AspectRatio>
          </div>
        ))}
      </div>

      <div className="lg:hidden">
        <Carousel
          className="w-full"
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
            {subBillboard.map((item, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-full object-cover rounded-md"
                    />
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
};


