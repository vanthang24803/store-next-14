"use client";

import { CardItem } from "@/components/card-item";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useHistoryClick from "@/hooks/use-history-click";
import Autoplay from "embla-carousel-autoplay";

export const HistoryCard = () => {
  const { items } = useHistoryClick();

  return (
    <>{items.length > 0 && <div className="flex flex-col space-y-4 md:space-y-4 my-6">
    <span className="text-2xl font-bold">Sản phẩm bạn đã xem</span>
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 1500,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index} className="basis-1/2 lg:basis-1/5">
            <div className="p-1">
              <CardItem product={item} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden lg:block">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  </div>}</>
  );
};
