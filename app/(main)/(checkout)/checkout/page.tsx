"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { signOut, useSession } from "next-auth/react";
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
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import axios from "axios";
import { useRouter } from "next/navigation";

type CheckboxType = "send" | "store";
type PaymentType = "cod" | "bank" | "momo";

const formSchema = z.object({
  email: z.string().min(1),
  name: z.string().min(1),
  address: z.string().min(1),
  numberPhone: z.string().min(1),
});

type CreateFormValue = z.infer<typeof formSchema>;

const Checkout = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: session } = useSession();

  const [sendChecked, setSendChecked] = useState(true);
  const [storeChecked, setStoreChecked] = useState(false);

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

  const uuid = self.crypto.randomUUID();

  const onSubmit = async (data: CreateFormValue) => {
    const dataSend = {
      ...data,
      id: uuid,
      products: cart.items.map((item) => ({
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
      userId: session?.user.id || "",
    };

    console.log(dataSend);

    try {
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
      } else {
        toast.error("Thất bại");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isClient && (
        <div className="flex flex-col lg:flex-row lg:px-52 lg:space-x-8">
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

            {session ? (
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={session.user.avatar} />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-neutral-600 text-[15px]">
                    {session.user.name} ({session.user.email})
                  </span>
                  <span
                    onClick={() => signOut()}
                    className="hover:cursor-pointer text-sm"
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
                      </FormItem>
                    )}
                  />
                </div>

                <Method
                  handleCheckboxChange={handleCheckboxChange}
                  sendChecked={sendChecked}
                  storeChecked={storeChecked}
                />

                <Payment
                  payment={payment}
                  handleBankChange={handleBankChange}
                />

                <div className="flex justify-between">
                  <Link href={`/cart`}>Giỏ hàng</Link>

                  <Button type="submit" variant="primary">
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
};

export default Checkout;
