"use client";

import { redirect, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Profile } from "@/types";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";
import { UpdateForm } from "./_components/update-form";

export default function Profile() {
  const { data: session } = useSession();

  const [profile, setProfile] = useState<Profile>();

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile/${session?.user?.id}`,
        { headers: { Authorization: `Bearer ${session?.token?.token}` } }
      );

      if (response.status == 200) {
        setProfile(response.data);
      } else {
        console.log("Error");
      }
    };

    fetchData();
  }, [session?.user?.id, session?.token]);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex items-center justify-center flex-col  space-y-4 ">
        <h1 className="text-2xl  font-bold">Tài khoản của bạn</h1>
        <div className="w-[100px] h-1 bg-black rounded"></div>
      </div>

      <div className="flex flex-col lg:flex-row  md:px-12 px-4 space-y-4 lg:space-y-0">
        <div className="flex flex-col space-y-4 lg:basis-1/4">
          <h2 className="uppercase font-semibold">TÀI KHOẢN</h2>

          <Link
            href="/profile"
            className="hover:text-[#417505] font-medium text-sm"
          >
            Thông tin tài khoản
          </Link>
          <Link
            href="/profile/address"
            className="hover:text-[#417505] font-medium text-sm"
          >
            Địa chỉ
          </Link>
          <Link
            href="/profile/order"
            className="hover:text-[#417505] font-medium text-sm"
          >
            Đơn hàng
          </Link>
          <span
            className="hover:text-[#417505] font-medium text-sm hover:cursor-pointer"
            onClick={() => signOut()}
          >
            Đăng xuất
          </span>
        </div>

        <div className="flex flex-col space-y-4 w-full bg-white p-4 rounded-md">
          <h2 className="uppercase font-semibold">THÔNG TIN TÀI KHOẢN</h2>

          {update ? (
            <UpdateForm
              update={update}
              setUpdate={setUpdate}
              profile={profile}
              id={session?.user.id}
              token={session?.token.token}
            />
          ) : (
            <>
              <div className="flex flex-col text-[14px] space-y-3 pb-4">
                <div className="flex items-center justify-center my-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={session?.user.avatar} />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                </div>
                <span>
                  Tên: {profile?.firstName} {profile?.lastName}
                </span>
                <span>Email: {profile?.email}</span>
                {profile?.address != "" ? (
                  <span>Địa chỉ: {profile?.address}</span>
                ) : (
                  <span>Địa chỉ: Đang cập nhật</span>
                )}
              </div>
              <Button
                className="lg:w-[200px] w-full"
                onClick={() => setUpdate(!update)}
              >
                Cập nhật thông tin
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
