/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Profile } from "@/types";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";
import { UpdateForm } from "./_components/update-form";
import useAuth from "@/hooks/use-auth";
import { redirect } from "next/navigation";

export default function Profile() {
  const [profile, setProfile] = useState<Profile>();

  const auth = useAuth();

  const [update, setUpdate] = useState(false);

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile/${auth.user?.id}`,
      { headers: { Authorization: `Bearer ${auth.token}` } }
    );

    if (response.status == 200) {
      setProfile(response.data);
    } else {
      console.log("Error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!auth.isLogin) {
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
            onClick={() => auth.logout()}
          >
            Đăng xuất
          </span>
        </div>

        <div className="flex flex-col space-y-4 w-full bg-white p-4 rounded-md">
          <h2 className="uppercase font-semibold">THÔNG TIN TÀI KHOẢN</h2>

          {update ? (
            <UpdateForm
              update={update}
              fetchData={fetchData}
              setUpdate={setUpdate}
              profile={profile}
              id={auth.user?.id}
              token={auth.token}
            />
          ) : (
            <>
              <div className="flex flex-col text-[14px] space-y-3 pb-4">
                <div className="flex items-center justify-center my-4 ">
                  <div className="relative">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={auth.user?.avatar} />
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    {auth.user?.role.includes("ADMIN") && (
                      <img
                        className="absolute -top-2 -right-4 w-8 h-8"
                        src="https://fullstack.edu.vn/static/media/crown.8edf462029b3c37a7f673303d8d3bedc.svg"
                        alt="admin"
                      />
                    )}
                  </div>
                </div>
                <span>
                  Tên: {profile?.firstName} {profile?.lastName}
                </span>
                <span>Email: {profile?.email}</span>

                {auth.user?.role.includes("ADMIN") && <span>Role: ADMIN</span>}

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
