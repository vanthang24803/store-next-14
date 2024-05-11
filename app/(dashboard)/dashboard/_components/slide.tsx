"use client";

import { Check, CreditCard, DollarSign, Package } from "lucide-react";
import CountUp from "react-countup";
import { Statistical } from "@/types";
import { CustomCard } from "./custorm-card";

type Type = {
  totalRevenue: Statistical;
  totalProduct: number;
  percentChange: number;
};

export const Slide = ({ totalRevenue, totalProduct , percentChange }: Type) => {
  return (
    <div className="grid gap-4 grid-cols-4">
      <CustomCard
        title="Total Revenue"
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        content={
          <div className="text-2xl font-bold">
            <CountUp end={totalRevenue.totalPrice} start={0} duration={1.25} />₫
          </div>
        }
        percentChange={percentChange}
      />
      <CustomCard
        title="Sales"
        icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
        content={
          <div className="text-2xl font-bold">
            +<CountUp end={totalRevenue.totalOrder} start={0} duration={1.25} />
          </div>
        }
      />
      <CustomCard
        title="Total Products Sale"
        icon={<Check className="h-4 w-4 text-muted-foreground" />}
        content={
          <div className="text-2xl font-bold">
            <CountUp end={totalRevenue.totalProduct} start={0} duration={1.25} />
          </div>
        }
      />

      <CustomCard
        title=" Products In Stock"
        icon={<Package className="h-4 w-4 text-muted-foreground" />}
        content={
          <div className="text-2xl font-bold">
            <CountUp end={totalProduct} start={0} duration={1.25} />
          </div>
        }
      />
    </div>
  );
};
