/* eslint-disable jsx-a11y/alt-text */
"use client";

import { Button } from "@/components/ui/button";
import { GanttChart, Clipboard, Info, Database, Image } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  id: string;
}

export const Navigation = ({ id }: Props) => {
  const router = useRouter();

  const pathname = usePathname();

  const arr = [
    {
      name: (
        <>
          <GanttChart className="w-4 h-4" /> <span>Overview</span>
        </>
      ),
      path: "",
    },
    {
      name: (
        <>
          <Clipboard className="w-4 h-4" /> <span>Category</span>
        </>
      ),
      path: "/categories",
    },
    {
      name: (
        <>
          <Database className="w-4 h-4" /> <span>Options</span>
        </>
      ),
      path: "/options",
    },
    {
      name: (
        <>
          <Image className="w-4 h-4" /> <span>Images</span>
        </>
      ),
      path: "/images",
    },
    {
      name: (
        <>
          <Info className="w-4 h-4" /> <span>Information</span>
        </>
      ),
      path: "/information",
    },
  ];

  return (
    <div className="flex flex-col space-y-2 ">
      {arr.map((item, index) => (
        <Button
          key={index}
          variant={pathname === `/dashboard/product/${id}${item.path}` ? "primary" : "ghost"}
          className="flex justify-start space-x-3"
          onClick={() => router.push(`/dashboard/product/${id}${item.path}`)}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};