"use client";

import { Link } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ShareProps {
  productId: string | undefined;
}

export const Share = ({ productId }: ShareProps) => {
  const onCopy = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/products/${productId}` || ""
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

      <span
        className="underline hover:cursor-pointer text-sm"
        onClick={() => router.push(`/products/${productId}`)}
      >
        Xem chi tiết sản phẩm
      </span>
    </div>
  );
};
