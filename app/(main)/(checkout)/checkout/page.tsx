"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Payment } from "./_components/payment";
import { Button } from "@/components/ui/button";
import { Method } from "./_components/method";
import { Cart } from "./_components/cart";
import { MobileCart } from "./_components/mobile-cart";
import useCart from "@/hooks/use-cart";

import { FormProvider } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useAuth from "@/hooks/use-auth";
import { info } from "@/constant";
import useClient from "@/hooks/use-client";
import useHandlerCheckout from "@/hooks/use-handler-checkout";
import useFormCheckOut from "@/hooks/use-form-checkout";
import { AuthCheckout } from "./_components/auth-checkout";
export default function Checkout() {
  const { isClient } = useClient();

  const auth = useAuth();
  const cart = useCart();

  const [exitAddress, setAddress] = useState("");

  const {
    payment,
    storeChecked,
    sendChecked,
    handleBankChange,
    handleCheckboxChange,
    handlerFindVoucher,
    setCode,
    setVoucher,
    totalPrice,
    finalPrice,
    code,
    error,
    voucher,
  } = useHandlerCheckout();

  const { form, loading, onSubmit, priceShip } = useFormCheckOut({
    email: auth.user?.email,
    name: auth.user?.name,
    address: info.address,
    storeChecked,
    exitAddress,
    payment,
    sendChecked,
    voucher: code,
    userId: auth.user?.id,
    totalPrice: finalPrice,
  });

  return (
    <>
      {isClient && (
        <div className="flex flex-col lg:flex-row lg:px-44 lg:space-x-8">
          <div className="flex flex-col space-y-3 p-8">
            <Link href={`/`} className="font-semibold text-2xl">
              AMAK Store
            </Link>

            <div className="lg:hidden">
              <MobileCart
                ship={sendChecked}
                totalPrice={cart.totalPrice()}
                priceShip={priceShip}
              />
            </div>

            <div className="flex items-center space-x-3 text-[12px] text-neutral-500 font-medium">
              <Link href={`/cart`}>Giỏ hàng</Link>
              <ChevronRight className="w-4 h-4" />
              <span>Thông tin giao hàng</span>
            </div>

            <span className="font-bold stext-xl">Thông tin giao hàng</span>

            <AuthCheckout />

            <FormProvider {...form}>
              <form
                className="w-full lg:w-[500px] flex flex-col space-y-3"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Họ và tên" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex w-full justify-between md:flex-row flex-col space-y-3 md:space-y-0">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Email"
                            type="email"
                            {...field}
                            className="lg:w-[280px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="numberPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Số điện thoại" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Method
                  setAddress={setAddress}
                  handleCheckboxChange={handleCheckboxChange}
                  sendChecked={sendChecked}
                  storeChecked={storeChecked}
                />

                <Payment
                  finalPrice={finalPrice}
                  payment={payment}
                  handleBankChange={handleBankChange}
                />

                <div className="flex justify-between text-sm">
                  <Link href={`/cart`}>Giỏ hàng</Link>

                  <Button type="submit" variant="primary" disabled={loading}>
                    Hoàn tất đơn hàng
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>

          <Cart
            ship={sendChecked}
            setCode={setCode}
            error={error}
            handlerFindVoucher={handlerFindVoucher}
            setVoucher={setVoucher}
            voucher={voucher}
            totalPrice={totalPrice}
            priceShip={totalPrice + 35000}
          />
        </div>
      )}
    </>
  );
}
