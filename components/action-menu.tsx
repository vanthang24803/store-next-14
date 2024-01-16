"use client";

import { UserAction } from "@/components/user-action";
import { CartAction } from "@/components/cart-action";
import { MobileMenu } from "@/components/mobile-menu";

export const ActionMenu = () => {
  return (
    <div className="flex items-center space-x-4">
      <UserAction />
      <CartAction />
      <div className="block md:hidden">
        <MobileMenu />
      </div>
    </div>
  );
};
