"use client";

import { Product } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CardItem } from "@/components/card-item";

interface BestSellerProps {
  data?: Product[];
}

export const BestSeller = ({ data }: BestSellerProps) => {
  return (
    <div className="flex flex-col space-y-4 md:space-y-4 my-6">
      <h1 className="uppercase text-2xl font-semibold mx-2">
        Top sản phẩm bán chạy
      </h1>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {data?.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
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
    </div>
  );
};
