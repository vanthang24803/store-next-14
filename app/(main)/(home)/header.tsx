"use client";

import { Billboard } from "@/types";
import { Slider } from "./_components/slider";
import { BillboardHeader } from "./_components/billboard";

interface HeaderProps {
  billboard?: Billboard[];
}

export const Header = ({ billboard }: HeaderProps) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row space-y-6 justify-between">
        {billboard && <Slider billboard={billboard} />}
        <BillboardHeader />
      </div>
    </>
  );
};
