"use client";

import { CartAction } from "@/components/cart/cart-action";
import { MobileMenu } from "@/components/mobile-menu";
import { UserIcon } from "@/components/icons/icon-user";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";

export const ActionMenu = () => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center space-x-8">
      {session ? (
        <Avatar>
          <AvatarImage src={session.user.avatar} />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
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
  );
};
