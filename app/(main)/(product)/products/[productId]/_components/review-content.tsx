"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Review } from "@/types";
import { Stars } from "./list-star";
import { starList } from "@/constant";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { MoreHorizontal, Settings, Trash2 } from "lucide-react";
import useAuth from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type Props = {
  review: Review;
};

export const ReviewContent = ({ review }: Props) => {
  const auth = useAuth();
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between">
        <div className="lg:basis-1/3 md:bottom-1/2">
          <div className="w-full flex items-center space-x-3">
            <Avatar className="hover:cursor-pointer">
              <AvatarImage src={review.customerAvatar} />
            </Avatar>
            <p className="text-sm font-semibold">{review.customerName}</p>
          </div>
        </div>
        <div className="lg:basis-2/3 md:basis-1/2 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Stars stars={review.star} />
              <p className="text-sm font-semibold">{starList[review.star]}</p>
            </div>
            {auth.user?.id === review.customerId && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreHorizontal className="w-4 h-4 hover:cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="flex items-center space-x-2 hover:cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                      <span>Xóa</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center space-x-2 hover:cursor-pointer">
                      <Settings className="w-4 h-4" />
                      <span>Sửa</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <span className="text-sm my-4">{review.content}</span>

          {review.images.length > 0 && (
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
              {review.images.map((item) => (
                <div
                  key={item.id}
                  className="rounded-md w-[80px] h-[80px] object-cover hover:cursor-pointer bg-cover"
                  style={{
                    backgroundImage: `url(${item.url})`,
                  }}
                />
              ))}
            </div>
          )}

          <span className="text-sm text-neutral-400 font-medium">
            Đánh giá vào{" "}
            {formatDistanceToNow(review.createAt, {
              locale: vi,
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
      <Separator />
    </div>
  );
};
