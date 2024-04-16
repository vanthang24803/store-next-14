"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "./overview";

type Props = {
  chart: any[];
};

export const ChartOverview = ({ chart }: Props) => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="font-bold">Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <Overview data={chart} />
      </CardContent>
    </Card>
  );
};
