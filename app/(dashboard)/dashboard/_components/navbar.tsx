"use client";

import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardMenu } from "@/constant";
import useAuth from "@/hooks/use-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Navbar = () => {

  const router = useRouter();

  const auth = useAuth();
  return (
    <nav className="fixed hidden top-0 w-full h-14 border-b px-6 shadow-sm bg-white dark:bg-black lg:flex items-center z-50 ">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <div className="flex items-center space-x-8">
          <Logo />
          <div className="flex items-center space-x-8 font-medium text-sm">
            {DashboardMenu.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className="hover:text-[#65b10d]"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Avatar
            onClick={() => router.push("/profile")}
            className="hover:cursor-pointer"
          >
            <AvatarImage src={auth.user?.avatar} />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
};
