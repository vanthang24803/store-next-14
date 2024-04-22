/* eslint-disable react-hooks/exhaustive-deps */
import { Order, Profile } from "@/types";
import { useEffect, useState } from "react";
import useAuth from "./use-auth";
import _http from "@/utils/http";

export default function useProfile() {
  const auth = useAuth();

  const [profile, setProfile] = useState<Profile>();
  const [order, setOrder] = useState<Order[] | null>(null);

  const fetchData: () => Promise<void> = async () => {
    const response = await _http.get(
      `/api/auth/profile/${auth.user?.id}`
    );

    if (response.status == 200) {
      setProfile(response.data.profile);
    } else {
      console.log("Error");
    }
  };

  const fetchOrder: () => Promise<void> = async () => {
    const response = await _http.get(
      `/api/order/${auth.user?.id}/user`
    );

    if (response.status == 200) {
      setOrder(response.data);
    }
  };

  useEffect(() => {
    if (auth.isLogin) {
      fetchOrder();
    }
  }, [auth.user]);

  useEffect(() => {
    if (auth.isLogin) {
      fetchData();
    }
  }, []);

  return {
    auth,
    fetchData,
    profile,
    order,
  };
}
