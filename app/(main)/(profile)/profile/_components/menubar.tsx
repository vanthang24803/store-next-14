"use client";

import useAuth from "@/hooks/use-auth";
import Link from "next/link";

export const Menubar = () => {
  const auth = useAuth();

  return (
    <div className="flex flex-col space-y-4 lg:basis-1/4">
      <h2 className="uppercase font-semibold">TÀI KHOẢN</h2>

      <Link
        href="/profile"
        className="hover:text-[#417505] font-medium text-sm"
      >
        Thông tin tài khoản
      </Link>
      <Link
        href="/profile/address"
        className="hover:text-[#417505] font-medium text-sm"
      >
        Địa chỉ
      </Link>
      <Link
        href="/profile/order"
        className="hover:text-[#417505] font-medium text-sm"
      >
        Đơn hàng
      </Link>
      <span
        className="hover:text-[#417505] font-medium text-sm hover:cursor-pointer"
        onClick={() => auth.logout()}
      >
        Đăng xuất
      </span>
    </div>
  );
};
