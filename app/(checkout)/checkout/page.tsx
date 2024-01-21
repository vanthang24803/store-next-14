"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { signOut, useSession } from "next-auth/react";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar"
;
import { Payment } from "./_components/payment";
import { Method } from "./_components/Method";
import { Button } from "@/components/ui/button";

type CheckboxType = "send" | "store";
type PaymentType = "cod" | "bank" | "momo";

const Checkout = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: session } = useSession();

  const [sendChecked, setSendChecked] = useState(true);
  const [storeChecked, setStoreChecked] = useState(false);

  const [cod, setCod] = useState(true);
  const [bank, setBank] = useState(false);
  const [momo, setMomo] = useState(false);

  const handleBankChange = (paymentType: PaymentType) => {
    if (paymentType === "cod") {
      setCod((current) => !current);
      setBank(false);
      setMomo(false);
    } else if (paymentType === "bank") {
      setBank((current) => !current);
      setCod(false);
      setMomo(false);
    } else if (paymentType === "momo") {
      setMomo((current) => !current);
      setCod(false);
      setBank(false);
    }
  };

  const handleCheckboxChange = (checkboxType: CheckboxType) => {
    if (checkboxType === "send") {
      setSendChecked((current) => !current);
      setStoreChecked(false);
    } else if (checkboxType === "store") {
      setStoreChecked((current) => !current);
      setSendChecked(false);
    }
  };

  return (
    <>
      {isClient && (
        <div className="flex flex-col lg:flex-row p-8 lg:px-52">
          <div className="flex flex-col space-y-3">
            <Link href={`/`} className="font-semibold text-2xl">
              AMAK Store
            </Link>

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

            <form className="w-full lg:w-[500px] flex flex-col space-y-3">
              <Input placeholder="Họ và tên" />
              <div className="flex md:flex-row flex-col md:space-x-3 space-y-3 md:space-y-0">
                <Input placeholder="Email" type="email" />
                <Input placeholder="Số điện thoại" className="md:w-2/3" />
              </div>

              <Method
                handleCheckboxChange={handleCheckboxChange}
                sendChecked={sendChecked}
                storeChecked={storeChecked}
              />

              <Payment
                bank={bank}
                momo={momo}
                cod={cod}
                handleBankChange={handleBankChange}
              />

              <div className="flex justify-between">
                <Link href={`/cart`}>Giỏ hàng</Link>

                <Button type="submit" variant="primary">
                  Hoàn tất đơn hàng
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
