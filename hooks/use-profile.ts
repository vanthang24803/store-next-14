/* eslint-disable react-hooks/exhaustive-deps */
import { Order, Profile } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "./use-auth";

export default function useProfile() {
  const auth = useAuth();

  const [profile, setProfile] = useState<Profile>();
  const [order, setOrder] = useState<Order[] | null>(null);

  const fetchData : () => Promise<void> = async () => {
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
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/order/${auth.user?.id}/user`)
      .then((response) => {
        if (response.status === 200) {
          setOrder(response.data);
        }
      });
  }, [auth.user]);

  useEffect(() => {
    fetchData();
  }, []);

  return {
    auth,
    fetchData,
    profile,
    order,
  };
}
