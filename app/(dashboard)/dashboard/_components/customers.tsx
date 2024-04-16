/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, PartyPopper } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { OrderUserSelling } from "@/types";
import { get } from "@/lib/api";
import { price } from "@/lib/format-price";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Spinner } from "@/components/spinner";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

export const Customers = () => {
  const [select, setSelect] = useState("day");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<OrderUserSelling[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await get(
          `/api/order/selling?Time=${
            select.charAt(0).toUpperCase() + select.slice(1)
          }`
        );
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (e: any) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [select]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
        <CardTitle className="text-xl font-bold">Customers</CardTitle>
        <CardDescription>
          <PartyPopper className="w-4 h-4" />
        </CardDescription>
      </CardHeader>
      <CardDescription className="pb-4 px-3.5">
        {select === "day" &&
          `Top customers of the ${format(new Date(), "dd/MM/yyyy")}`}
        {select === "month" &&
          `Top customers of ${format(new Date(), "MMMM yyyy")}`}
        {select === "year" && `Top customers of ${format(new Date(), "yyyy")}`}
      </CardDescription>
      <CardContent>
        <Tabs
          defaultValue={select}
          className="w-full"
          onValueChange={(value) => setSelect(value)}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
          <TabsContent value={select}>
            <Card className="w-full mt-2 pt-4 ">
              {loading ? (
                <div className="flex items-center justify-center">
                  <Spinner />
                </div>
              ) : (
                <CardContent className="space-y-8">
                  <>
                    {users && users?.length > 0 ? (
                      <>
                        {users?.map((item, index) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarImage src={item.avatar} alt="avatar" />
                                <AvatarFallback>
                                  {item.lastName[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col space-y-1 text-sm ">
                                <div className="flex items-center space-x-2">
                                  {index < 3 && (
                                    <img
                                      src={`/${index + 1}.png`}
                                      alt="rank"
                                      width={16}
                                      height={16}
                                      className="object-cover"
                                    />
                                  )}
                                  <h3 className="font-bold">
                                    {item.firstName} {item.lastName}
                                  </h3>
                                </div>
                                <span className="text-[13px] text-muted-foreground">
                                  {item.email}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-end flex-col">
                              <p className="text-[14px] font-bold tracking-tighter">
                                +{price(item.totalPrice)}₫
                              </p>
                              <span className="text-[12px] text-muted-foreground">
                                +
                                {item.totalOrder > 1
                                  ? `${item.totalOrder} orders`
                                  : `${item.totalOrder} order`}
                              </span>
                            </div>
                          </div>
                        ))}
                        <div className="flex flex-col space-y-4">
                          <Separator />
                          <div className="flex items-center justify-between ">
                            <h3 className="text-base font-semibold">Total</h3>
                            <div className="flex flex-col items-end">
                              <p className="text-[14px] font-bold tracking-tighter">
                                +
                                {price(
                                  users.reduce(
                                    (total, user) => total + user.totalPrice,
                                    0
                                  )
                                )}
                                ₫
                              </p>
                              <span className="text-[12px] text-muted-foreground">
                                +
                                {users.reduce(
                                  (total, user) => total + user.totalOrder,
                                  0
                                ) > 1
                                  ? `${users.reduce(
                                      (total, user) => total + user.totalOrder,
                                      0
                                    )} orders`
                                  : `${users.reduce(
                                      (total, user) => total + user.totalOrder,
                                      0
                                    )} order`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-center">
                        <BarChart className="w-20 h-20" />
                        <span className="text-[12px] text-muted-foreground">
                          No Analytics!
                        </span>
                      </div>
                    )}
                  </>
                </CardContent>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
