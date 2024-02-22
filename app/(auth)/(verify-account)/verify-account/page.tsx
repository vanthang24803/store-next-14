"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@/components/spinner";

export default function OrderId() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  
  const userId = searchParams.get("userId");
  
  console.log(userId);
  console.log(token)
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-account?userId=${userId}&token=${token}`
        );

        if (response.status == 200) {
          toast.success("Success");
          setLoading(false);
          router.push("/login");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userId, token, router]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <div className="md:w-[500px] w-[360px] py-4 px-6 bg-white/90 rounded-lg  flex flex-col space-y-1">
          {loading && (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          )}
        </div>
      )}
    </>
  );
}
