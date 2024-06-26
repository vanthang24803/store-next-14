/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Separator } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, MoreHorizontal, Plus, Settings, Trash, X } from "lucide-react";
import useClient from "@/hooks/use-client";
import useAuth from "@/hooks/use-auth";
import { Spinner } from "@/components/spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateAddressForm } from "./_components/create-form";
import _http from "@/utils/http";

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
  const [create, setCreate] = useState(false);

  const [address, setAddress] = useState<Address[]>([]);

  const fetchAddress = async () => {
    try {
      setLoading(true);
      const response = await _http.get(
        `/api/auth/profile/${user?.id}/address`,
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

  const activeAddress = async (addressId: string) => {
    try {
      const response = await _http.put(
        `/api/auth/profile/${user?.id}/address/${addressId}/active`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status == 200) {
        fetchAddress();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeAddress = async (addressId: string) => {
    try {
      const response = await _http.delete(
        `/api/auth/profile/${user?.id}/address/${addressId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status == 200) {
        fetchAddress();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!isClient) return null;

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex items-center justify-center flex-col  space-y-4 ">
        <h1 className="text-2xl  font-bold">Địa chỉ của bạn</h1>
        <Separator className="w-[100px] h-1 bg-black rounded" />
      </div>

      <div className="flex flex-col space-y-4 w-full bg-white p-4 rounded-md">
        <div className="flex items-center justify-between">
          <h2 className="capitalize font-semibold">Danh sách địa chỉ</h2>
          <Button onClick={() => setCreate(!create)}>
            {create ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </Button>
        </div>
        {!loading ? (
          <div>
            {create ? (
              <CreateAddressForm
                fetchAddress={fetchAddress}
                setUCreate={setCreate}
              />
            ) : (
              <>
                {address.length > 0 ? (
                  <div className="flex flex-col space-y-3">
                    {address.map((item) => {
                      return (
                        <div
                          className="flex items-center justify-between gap-x-4"
                          key={item.id}
                        >
                          <div
                            className="p-4 border rounded-md flex items-center justify-between hover:cursor-pointer
                                  hover:bg-neutral-100/80 w-full 
                                "
                            onClick={() => activeAddress(item.id)}
                          >
                            <p className="text-sm mx-2">{item.name}</p>
                            {item.status && (
                              <Check className="text-green-600" />
                            )}
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Button variant="ghost">
                                <MoreHorizontal />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              {!item.status && (
                                <DropdownMenuItem
                                  className="flex items-center space-x-2 hover:cursor-pointer"
                                  onClick={() => removeAddress(item.id)}
                                >
                                  <Trash className="w-4 h-4" />
                                  <span>Xóa</span>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                className="flex items-center space-x-2 hover:cursor-pointer"
                                onClick={() => setUpdate(!update)}
                              >
                                <Settings className="w-4 h-4" />
                                <span>Chỉnh sửa</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <p>Chưa thêm địa chỉ</p>
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
  );
}
