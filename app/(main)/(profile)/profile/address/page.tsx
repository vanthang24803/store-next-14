/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Separator } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { Menubar } from "../_components/menubar";
import { Button } from "@/components/ui/button";
import { Check, Plus, Settings, X } from "lucide-react";
import useClient from "@/hooks/use-client";
import axios from "axios";
import useAuth from "@/hooks/use-auth";
import { Spinner } from "@/components/spinner";
import { Toggle } from "@/components/ui/toggle";

type Address = {
  id: string;
  name: string;
  status: boolean;
};

export default function AddressProfile() {
  const { isClient } = useClient();

  const { user, token } = useAuth();

  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState<Address[]>([]);

  const fetchAddress = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile/${user?.id}/address`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status == 200) {
        setAddress(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddress();
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
              <div className="flex items-center justify-between">
                <h2 className="capitalize font-semibold">Danh sách địa chỉ</h2>
                <Button onClick={() => setUpdate(!update)}>
                  {update ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </Button>
              </div>
              {!loading ? (
                <div>
                  {update ? (
                    <div>Hello</div>
                  ) : (
                    <>
                      {address ? (
                        <div className="flex flex-col space-y-3">
                          {address.map((item) => {
                            return (
                              <div
                                key={item.id}
                                className="w-full p-2 border rounded-md flex items-center justify-between"
                              >
                                <p className="text-sm mx-2">{item.name}</p>
                                <Toggle
                                  variant={item.status ? "default" : "outline"}
                                >
                                  <Check
                                    className={
                                      item.status
                                        ? "text-green-600 text-bold"
                                        : "text-neutral-600"
                                    }
                                  />
                                </Toggle>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <p>Chưa thêm địa chỉ</p>
                          <Button>
                            <Plus className="w-5 h-5" />
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-20">
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
