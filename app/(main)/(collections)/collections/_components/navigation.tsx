"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const NavigationTop = ({ collection }: { collection: string }) => {
  return (
    <div className="flex items-center space-x-3 text-sm font-medium">
      <Link href={`/`}>Trang chủ</Link>
      <ChevronRight className="w-4 h-4" />
      <span>{collection}</span>
    </div>
  );
};
