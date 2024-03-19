/* eslint-disable @next/next/no-img-element */
"use client";

import { Spinner } from "@/components/spinner";
import { Separator } from "@/components/ui/separator";
import { Menubar } from "../_components/menubar";
import useClient from "@/hooks/use-client";
import useProfile from "@/hooks/use-profile";
import { ProfileOrder } from "../_components/profile-order";

export default function Order() {
  const { isClient } = useClient();

  const { order } = useProfile();

  return (
    <>
      {isClient && (
        <div className="flex flex-col space-y-8">
          <div className="flex items-center justify-center flex-col  space-y-4 ">
            <h1 className="text-2xl  font-bold">Đơn hàng của bạn</h1>
            <Separator className="w-[100px] h-1 bg-black rounded" />
          </div>

            <div className="flex flex-col space-y-4 w-full bg-white p-4 rounded-md">
              <h2 className="uppercase font-semibold">THÔNG TIN ĐƠN HÀNG</h2>
              <div className="flex flex-col space-y-3">
                {order != null ? (
                  <ProfileOrder order={order} />
                ) : (
                  <div className="flex items-center justify-center h-[20vh]">
                    <Spinner />
                  </div>
                )}
              </div>
            </div>
          </div>
      )}
    </>
  );
}
