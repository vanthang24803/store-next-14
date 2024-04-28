"use client";

import { generateSlug } from "@/utils/slug";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ShareProps {
  id: string;
  show?: boolean;
  name: string;
}

export const Share = ({ id, show, name }: ShareProps) => {
  const onCopy = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/products/${generateSlug(name, id)}` || ""
    );

    toast.success("Url đã được copy!");
  };

  const router = useRouter();

  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-2 text-sm py-2">
        <span className="font-medium">Chia sẻ:</span>
        <div
          className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white hover:cursor-pointer"
          onClick={onCopy}
        >
          <Link className="w-4 h-4" />
        </div>
      </div>

      {show && (
        <span
          className="underline hover:cursor-pointer text-sm"
          onClick={() => router.push(`/products/${generateSlug(name, id)}`)}
        >
          Xem chi tiết sản phẩm
        </span>
      )}
    </div>
  );
};
