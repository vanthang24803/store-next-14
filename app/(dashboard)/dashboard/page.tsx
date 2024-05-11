import { CalendarIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Heading } from "./_components/heading";
import getGraphRevenue from "@/actions/get-graph-revenue";
import getTotalProduct from "@/actions/get-total-product";
import getTotalRevenue from "@/actions/get-total-revenue";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Slide } from "./_components/slide";
import { ChartOverview } from "./_components/chart-overview";
import { RecentSales } from "./_components/recent-sale";
import { handlerPercentChange } from "@/utils/percent";

export default async function Dashboard() {
  const [totalRevenue, graphRevenue, totalProduct] = await Promise.all([
    getTotalRevenue(),
    getGraphRevenue(),
    getTotalProduct(),
  ]);

  const chart = Object.keys(graphRevenue).map((key) => ({
    name: key,
    total: graphRevenue[key],
  }));

  const percentChange = handlerPercentChange(chart);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading title="Dashboard" description="Overview of your store" />
          <Button
            variant="outline"
            className="justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(Date.now(), "PPpp")}
          </Button>
        </div>
        <Separator />
        <Slide
          totalProduct={totalProduct}
          totalRevenue={totalRevenue}
          percentChange={percentChange}
        />
        <ChartOverview chart={chart} />
        <RecentSales />
      </div>
    </div>
  );
}
