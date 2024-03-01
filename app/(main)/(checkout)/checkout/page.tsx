"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Payment } from "./_components/payment";
import { Button } from "@/components/ui/button";
import { Method } from "./_components/method";
import { Cart } from "./_components/cart";
import { MobileCart } from "./_components/mobile-cart";
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";

import * as z from "zod";
import { Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/use-auth";
import { info } from "@/constant";

type CheckboxType = "send" | "store";
type PaymentType = "cod" | "bank" | "momo";

const formSchema = z.object({
  email: z.string().min(1),
  name: z.string().min(1),
  address: z.string().min(1),
  numberPhone: z.string().min(1).max(10),
});

type CreateFormValue = z.infer<typeof formSchema>;

export default function Checkout() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const auth = useAuth();

  const [sendChecked, setSendChecked] = useState(true);
  const [storeChecked, setStoreChecked] = useState(false);
  const [exitAddress, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const [payment, setPayment] = useState<PaymentType | null>("cod");

  const handleBankChange = (paymentType: PaymentType) => {
    setPayment((current) => (current === paymentType ? "cod" : paymentType));
  };

  const handleCheckboxChange = (checkboxType: CheckboxType) => {
    if (checkboxType === "send") {
      setSendChecked((current) => !current);
      setStoreChecked(false);
      setPayment("cod");
    } else if (checkboxType === "store") {
      setStoreChecked((current) => !current);
      setSendChecked(false);
      setPayment(null);
    }
  };

  const cart = useCart();

  const router = useRouter();

  const totalPrice = cart.items.reduce((total, item) => {
    return (
      total +
      (item.product.options[0].price -
        (item.product.options[0].price * item.product.options[0].sale) / 100) *
        item.quantity
    );
  }, 0);

  const priceShip = totalPrice + 35000;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      address: "",
      name: "",
      numberPhone: "",
    },
  });

  useEffect(() => {
    form.setValue("email", auth.user?.email || "");
    form.setValue("name", auth.user?.name || "");
    form.setValue("address", storeChecked ? info.address : exitAddress);
  }, [auth.user, form, exitAddress, storeChecked]);

  const uuid = self.crypto.randomUUID();

  const onSubmit = async (data: CreateFormValue) => {
    const dataSend = {
      ...data,
      id: uuid,
      products: cart.items.map((item) => ({
        optionId: item.product.options[0].id,
        productId: item.product.id,
        name: item.product.name,
        thumbnail: item.product.thumbnail,
        option: item.product.options[0].name,
        price: item.product.options[0].price,
        sale: item.product.options[0].sale,
        quantity: item.quantity,
      })),
      payment: payment?.toUpperCase(),
      shipping: sendChecked,
      quantity: cart.items.length,
      totalPrice: totalPrice,
      userId: auth.user?.id || "",
    };


    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order/create`,
        dataSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        toast.success("Thành công");
        router.push(`/checkout/${uuid}`);
        cart.removeAll();
      } else {
        toast.error("Thất bại");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
                totalPrice={totalPrice}
                priceShip={priceShip}
              />
            </div>

            <div className="flex items-center space-x-3 text-[12px] text-neutral-500 font-medium">
              <Link href={`/cart`}>Giỏ hàng</Link>
              <ChevronRight className="w-4 h-4" />
              <span>Thông tin giao hàng</span>
            </div>

            <span className="font-bold stext-xl">Thông tin giao hàng</span>

            {auth.user ? (
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={auth.user.avatar} />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="tracking-tighter text-[15px] font-semibold">
                    {auth.user.name}
                  </p>
                  <span
                    className="hover:cursor-pointer hover:underline text-sm"
                    onClick={() => auth.logout()}
                  >
                    Đăng xuất
                  </span>
                </div>
              </div>
            ) : (
              <span className="text-sm text-neutral-600">
                Bạn đã có tài khoản?{" "}
                <Link href={`/login`} className="font-semibold mx-1">
                  Đăng nhập
                </Link>
              </span>
            )}

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
            totalPrice={totalPrice}
            priceShip={priceShip}
          />
        </div>
      )}
    </>
  );
}
