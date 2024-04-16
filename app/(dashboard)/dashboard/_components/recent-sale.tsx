"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SellingProducts } from "./selling-products";
import { Customers } from "./customers";

export const RecentSales = () => {
  return (
    <div className="grid gap-4 grid-cols-2">
      <SellingProducts />
      <Customers />
    </div>
  );
};
