"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Filter } from "../_components/filter";
import { useState } from "react";

export default function AllCategory() {
  const [low, setLow] = useState(false);
  const [medium, setMedium] = useState(false);
  const [high, setHigh] = useState(false);
  const [highest, setHighEst] = useState(false);
  const [max, setMax] = useState(false);

  return (
    <main className="md:max-w-screen-xl mx-auto p-4">
      <div className="flex items-center space-x-3 text-sm font-medium">
        <Link href={`/`}>Trang chủ</Link>
        <ChevronRight className="w-4 h-4" />
        <span>Tất cả sản phẩm</span>
      </div>
      <div className="flex lg:flex-row flex-col space-y-4 lg:space-y-0 w-full my-4">
        <Filter
          low={low}
          medium={medium}
          high={high}
          highest={highest}
          max={max}
        />
      </div>
    </main>
  );
}
