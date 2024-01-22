"use client";

import { Separator } from "@/components/ui/separator";
import { Label } from "@radix-ui/react-label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface FilterProp {
  low: boolean;
  medium: boolean;
  high: boolean;
  highest: boolean;
  max: boolean;
}

export const Filter = ({ low, medium, high, highest, max }: FilterProp) => {
  const [open, setOpen] = useState(true);
  const [filter, setFilter] = useState(true);

  return (
    <div className="lg:flex hidden flex-col space-y-4 w-1/3">
      <div className="w-full bg-white rounded-md py-2 px-4">
        <div
          className="flex flex-1 items-center justify-between py-1 font-medium transition-all hover:font-bold [&[data-state=open]>svg]:rotate-180 hover:cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <h1 className="font-bold">Danh mục sản phẩm</h1>
          {open ? (
            <ChevronUp className="h-4 w-4 shrink-0 transition-transform duration-200" />
          ) : (
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
          )}
        </div>
        {open && (
          <div className="my-1 flex flex-col space-y-2 text-sm font-medium">
            <Separator />
            <Link href={`/collections/onsale`}>Sản phẩm khuyến mãi</Link>
            <Link href={`/collections/hot-products`}>Sản phẩm nổi bật</Link>
            <Link href={`/collections/all`}>Tất cả sản phẩm</Link>
          </div>
        )}
      </div>

      <div className="w-full bg-white rounded-md py-2 px-4">
        <div
          className="flex flex-1 items-center justify-between py-1 font-medium transition-all hover:font-bold [&[data-state=open]>svg]:rotate-180 hover:cursor-pointer"
          onClick={() => setFilter(!filter)}
        >
          <h1 className="font-bold">Lọc giá</h1>
          {filter ? (
            <ChevronUp className="h-4 w-4 shrink-0 transition-transform duration-200" />
          ) : (
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
          )}
        </div>
        {filter && (
          <div className="my-1 flex flex-col space-y-3 text-sm font-medium">
            <Separator />
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded flex items-center justify-center border border-neutral-700">
                {low && <Check className="w-4 h-4" />}
              </div>
              <Label>Dưới 100.000₫</Label>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded flex items-center justify-center border border-neutral-700">
                {medium && <Check className="w-4 h-4" />}
              </div>
              <Label>100.000₫ - 200.000₫</Label>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded flex items-center justify-center border border-neutral-700">
                {high && <Check className="w-4 h-4" />}
              </div>
              <Label>200.000₫ - 300.000₫</Label>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded flex items-center justify-center border border-neutral-700">
                {highest && <Check className="w-4 h-4" />}
              </div>
              <Label>300.000₫ - 400.000₫</Label>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded flex items-center justify-center border border-neutral-700">
                {max && <Check className="w-4 h-4" />}
              </div>
              <Label>Trên 400.000₫</Label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
