/* eslint-disable jsx-a11y/alt-text */
"use client";

import { Button } from "@/components/ui/button";
import { GanttChart, Clipboard, Info, Database, Image } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
}

export const Navigation = ({ id }: Props) => {
  const router = useRouter();

  return (
    <div className="flex flex-col space-y-2 ">
      <Button
        variant="ghost"
        className="flex items-center space-x-2"
        onClick={() => router.push(`/dashboard/product/${id}`)}
      >
        <GanttChart className="w-4 h-4" /> <span>Overview</span>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center space-x-2"
        onClick={() => router.push(`/dashboard/product/${id}/categories`)}
      >
        <Clipboard className="w-4 h-4" />
        <span>Category</span>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center space-x-2"
        onClick={() => router.push(`/dashboard/product/${id}/options`)}
      >
        <Database className="w-4 h-4" />
        <span>Options</span>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center space-x-2"
        onClick={() => router.push(`/dashboard/product/${id}/images`)}
      >
        <Image className="w-4 h-4" />
        <span>Images</span>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center space-x-2"
        onClick={() => router.push(`/dashboard/product/${id}/information`)}
      >
        <Info className="w-4 h-4" />
        <span>Information</span>
      </Button>
    </div>
  );
};
