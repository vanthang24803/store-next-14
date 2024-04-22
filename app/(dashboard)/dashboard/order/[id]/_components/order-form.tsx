"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { price } from "@/utils/format-price";
import { Order } from "@/types";

interface OrderFormId {
  data: Order | null;
}

export const OrderForm = ({ data }: OrderFormId) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <FormItem>
          <FormLabel>Customer</FormLabel>
          <FormControl>
            <Input disabled placeholder={data?.name} />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>Address</FormLabel>
          <FormControl>
            <Input disabled placeholder={data?.address} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Payment</FormLabel>
          <FormControl>
            <Input disabled placeholder={data?.payment} />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>Quantity</FormLabel>
          <FormControl>
            <Input disabled value={data?.quantity} />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>Total Price</FormLabel>
          <FormControl>
            <Input disabled value={`${price(data?.totalPrice)}₫`} />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox checked={data?.shipping} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>Shipping</FormLabel>
            <FormDescription>
              This product will shipping to customer.
            </FormDescription>
          </div>
        </FormItem>
      </div>
    </>
  );
};
