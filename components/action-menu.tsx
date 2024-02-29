/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { CartAction } from "@/components/cart/cart-action";
import { MobileMenu } from "@/components/mobile-menu";
import { UserIcon } from "@/components/icons/icon-user";
import Link from "next/link";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { LogOut, Settings, ShoppingBasket, User } from "lucide-react";
import useAuth from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import axios from "axios";
import { Order } from "@/types";

export const ActionMenu = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();

  const [order, setOrder] = useState<Order[] | null>(null);

  const auth = useAuth();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/order/${auth.user?.id}/user`)
      .then((response) => {
        if (response.status === 200) {
          setOrder(response.data);
        }
      });
  }, [auth.user]);

  return (
    <>
      {isClient && (
        <div className="flex items-center space-x-8">
          {auth.isLogin ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="relative">
                  <Avatar>
                    <AvatarImage
                      src={auth.user?.avatar}
                      className="hover:cursor-pointer"
                    />
                    <AvatarFallback>
                      {auth.user?.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {auth.user?.role.includes("ADMIN") && (
                    <img
                      className="absolute -top-2 -right-1 w-4 h-4"
                      src="https://fullstack.edu.vn/static/media/crown.8edf462029b3c37a7f673303d8d3bedc.svg"
                      alt="admin"
                    />
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                  {auth.user?.name}{" "}
                  {auth.user?.role.includes("ADMIN") && (
                    <b className="uppercase text-destructive tracking-tighter">
                      {" "}
                      - Admin
                    </b>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Trang cá nhân</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/profile/order")}
                  >
                    <ShoppingBasket className="mr-2 h-4 w-4" />
                    <div className="flex items-center space-x-2">
                      <span>Đơn hàng</span>
                      {order &&
                        order?.filter((c) => c.status != "SUCCESS").length >
                          0 && (
                          <div className="flex items-center justify-center w-5 h-5 rounded-full text-white bg-red-500 text-sm">
                            {order?.filter((c) => c.status != "SUCCESS").length}
                          </div>
                        )}
                    </div>
                  </DropdownMenuItem>
                  {auth.user?.role.includes("ADMIN") && (
                    <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => auth.logout()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href={`/login`}>
              <UserIcon />
            </Link>
          )}
          <CartAction />
          <div className="block md:hidden">
            <MobileMenu />
          </div>
        </div>
      )}
    </>
  );
};
