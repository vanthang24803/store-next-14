"use client";

import { Logo } from "@/components/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  const auth = useAuth();

  return (
    <nav className="fixed top-0 w-full h-14 border-b px-10 shadow-sm dark:bg-slate-700 bg-white flex items-center z-50 justify-between">
      <Logo />
      <Avatar
        onClick={() => router.push("/profile")}
        className="hover:cursor-pointer"
      >
        <AvatarImage src={auth.user?.avatar} />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
    </nav>
  );
};
