/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Profile } from "@/types";
import { Button } from "@/components/ui/button";
import { UpdateForm } from "./_components/update-form";
import { Menubar } from "./_components/menubar";
import { AvatarUpload } from "./_components/update-avatar";
import { Spinner } from "@/components/spinner";
import useClient from "@/hooks/use-client";
import useProfile from "@/hooks/use-profile";

export default function Profile() {
  const [update, setUpdate] = useState(false);

  const { auth, fetchData, profile } = useProfile();

  const { isClient } = useClient();

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex items-center justify-center flex-col  space-y-4 ">
        <h1 className="text-2xl  font-bold">Tài khoản của bạn</h1>
        <div className="w-[100px] h-1 bg-black rounded"></div>
      </div>

      <div className="flex flex-col lg:flex-row  md:px-12 px-4 space-y-4 lg:space-y-0">
        <Menubar />

        {isClient ? (
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
                      <AvatarUpload
                        fetchData={fetchData}
                        profile={profile}
                        id={auth.user?.id}
                      />
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

                  {auth.user?.role.includes("ADMIN") && (
                    <span>Role: ADMIN</span>
                  )}

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
        ) : (
          <div className="flex items-center justify-center w-full h-[50vh]">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}
