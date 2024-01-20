"use client";

import { CartAction } from "@/components/cart/cart-action";
import { MobileMenu } from "@/components/mobile-menu";
import { UserIcon } from "@/components/icons/icon-user";
import Link from "next/link";
import { useSession , signOut } from "next-auth/react";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";

export const ActionMenu = () => {
  const { data: session } = useSession();

 
  const router = useRouter();

  return (
    <div className="flex items-center space-x-8">
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={session.user.avatar} className="hover:cursor-pointer" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                 signOut();
                  router.refresh();
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
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
  );
};
