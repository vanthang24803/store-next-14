"use client"

import { price } from "@/utils/format-price";

export const CustomTooltip = ({ active, payload }: any) => {
  if (!active) return null;

  return (
    <div className="p-4 bg-neutral-100 dark:bg-slate-900 flex flex-col gap-4 rounded-md overflow-hidden">
      <p className="text-sm text-primary font-medium flex items-center space-x-1">
       <p className="dark:text-neutral-100"> Total Revenue:</p>
        <span className={`ml-2 font-bold ${payload[0].value > 0 ? "text-emerald-500" : "text-destructive"}`}>
          {payload[0].value > 0 ? `${price(payload[0].value)}₫ `: "No Analytics!"}
        </span>
      </p>
    </div>
  );
};
