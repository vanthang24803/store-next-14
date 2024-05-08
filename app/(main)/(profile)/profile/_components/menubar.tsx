"use client";

import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
import useClient from "@/hooks/use-client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const Menubar = () => {
  const auth = useAuth();

  const menu = [
    {
      name: "Thông tin tài khoản",
      url: "/profile",
    },
    {
      name: "Địa chỉ",
      url: "/profile/address",
    },
    {
      name: "Đơn hàng",
      url: "/profile/order",
    },
  ];

  const pathname = usePathname();
  const router = useRouter();

  const { isClient } = useClient();

  if (!isClient) return null;

  return (
    <div className="lg:flex flex-col space-y-4 md:mt-20 m-4 hidden ">
      <h2 className="uppercase font-semibold mx-4">TÀI KHOẢN</h2>
      {menu.map((item, _) => (
        <Link href={item.url} key={_}>
          <Button
            variant={pathname === item.url ? "primary" : "ghost"}
            className="w-full md:w-[200px] justify-start "
          >
            {item.name}
          </Button>
        </Link>
      ))}
      {auth.user?.role.includes("ADMIN") && (
        <Button
          variant={pathname === "/profile/blogs" ? "primary" : "ghost"}
          onClick={() => router.push(`/profile/blogs`)}
          className="w-full md:w-[200px] justify-start"
        >
          Bài viết
        </Button>
      )}
      <Button
        variant="ghost"
        className="hover:text-[#417505] font-medium text-sm hover:cursor-pointer justify-normal"
        onClick={() => auth.logout()}
      >
        Đăng xuất
      </Button>
    </div>
  );
};
