/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Separator } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { Menubar } from "../_components/menubar";
import useAuth from "@/hooks/use-auth";
import { Profile } from "@/types";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";

export default function AddressProfile() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  return (
    <>
      {isClient && (
        <div className="flex flex-col space-y-8">
          <div className="flex items-center justify-center flex-col  space-y-4 ">
            <h1 className="text-2xl  font-bold">Địa chỉ của bạn</h1>
            <Separator className="w-[100px] h-1 bg-black rounded" />
          </div>
          <div className="flex flex-col lg:flex-row  md:px-12 px-4 space-y-4 lg:space-y-0">
            <Menubar />

            <div className="flex flex-col space-y-4 w-full bg-white p-4 rounded-md">
              <h2 className="capitalize font-semibold">Danh sách địa chỉ</h2>
              {profile?.address ? (
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <p className="font-semibold">Mặc định: </p>
                    <p>{profile?.address}</p>
                  </div>
                  <Button>
                    <Settings className="w-5 h-5" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p>Chưa thêm địa chỉ</p>
                  <Button>
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
