"use client";

import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

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

  return (
    <>
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
        <Button
          variant="ghost"
          className="hover:text-[#417505] font-medium text-sm hover:cursor-pointer justify-normal"
          onClick={() => auth.logout()}
        >
          Đăng xuất
        </Button>
      </div>
      <div className="block lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <Menu className="w-4 h-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col space-y-4 mt-8">
              <div className="flex flex-col space-y-6 ">
                {menu.map((item, index) => (
                  <Link
                    key={index}
                    href={item.url}
                    className={
                      pathname === item.url
                        ? "text-green-600 font-bold"
                        : "font-medium"
                    }
                  >
                    <SheetClose>{item.name}</SheetClose>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <SheetClose>
                <Button variant="destructive" onClick={() => auth.logout()}>
                  Đăng xuất
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
