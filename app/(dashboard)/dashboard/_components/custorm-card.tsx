import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CountUp from "react-countup";
import { ReactNode } from "react";

type Props = {
  title: string;
  icon: ReactNode;
  content: ReactNode;
  percentChange?: number;
};

export const CustomCard = ({ title, icon, content, percentChange }: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {content}
        {percentChange && (
          <CardDescription
            className={`${
              percentChange > 0 ? "text-emerald-500" : "text-red-500"
            } text-[12px] mt-2 font-semibold`}
          >
            <CountUp start={0} duration={1} end={percentChange} decimals={2} /> % of
            previous month 
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
};
