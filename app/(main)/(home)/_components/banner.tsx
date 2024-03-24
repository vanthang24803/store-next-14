"use client";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

export const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center w-full md:space-x-4 space-y-2 md:space-y-0 hover:cursor-pointer p-4 pb-6 md:pb-8">
      <div className="md:basis-1/2">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <Image
            src="https://theme.hstatic.net/200000294254/1001077164/14/homebanner_1_img.jpg?v=372"
            alt="Banner left"
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </div>
      <div className="md:basis-1/2">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <Image
            src="https://theme.hstatic.net/200000294254/1001077164/14/homebanner_2_img.jpg?v=372"
            alt="Banner right"
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </div>
    </div>
  );
};
