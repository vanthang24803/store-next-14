import {
  CalendarIcon,
  Check,
  CreditCard,
  DollarSign,
  Package,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "./_components/heading";
import { price } from "@/lib/format-price";
import { Overview } from "./_components/overview";
import getGraphRevenue from "@/actions/get-graph-revenue";
import getTotalProduct from "@/actions/get-total-product";
import getTotalRevenue from "@/actions/get-total-revenue";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
  const totalRevenue = await getTotalRevenue();
  const graphRevenue = await getGraphRevenue();
  const totalProduct = await getTotalProduct();

  const chart = Object.keys(graphRevenue).map((key) => ({
    name: key,
    total: graphRevenue[key],
  }));

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
        <div className="grid gap-4 grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {price(totalRevenue.totalPrice)}₫
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                +{totalRevenue.totalOrder}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products Sale
              </CardTitle>
              <Check className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalRevenue.totalProduct}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Products In Stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProduct}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="font-bold">Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={chart} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
