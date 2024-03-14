"use client";

import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/hooks/use-auth";
import Link from "next/link";

export const AuthCheckout = () => {
  const auth = useAuth();
  return (
    <>
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
    </>
  );
};
