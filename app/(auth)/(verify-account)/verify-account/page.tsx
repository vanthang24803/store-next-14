/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@/components/spinner";
import useClient from "@/hooks/use-client";
import useAuth from "@/hooks/use-auth";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function VerifyEmail() {
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  const { isClient } = useClient();
  const auth = useAuth();
  const [active, setActive] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      if (token) {
        auth.verifyEmail(
          userId,
          encodeURIComponent(token.replaceAll(" ", "+"))
        );
      }
      setActive(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const router = useRouter();


  return (
    <>
      {isClient && (
        <div className="md:w-[500px] w-[360px] min-h-[200px] py-4 px-6 bg-white/90 rounded-lg  flex flex-col space-y-1">
          {loading ? (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              {active && (
                <div className="flex flex-col justify-between items-center p-8 space-y-4 md:space-y-5">
                  <Image
                    src="/verify-email.svg"
                    alt="verify"
                    width={200}
                    height={200}
                  />
                  <h1 className="font-semibold text-lg md:text-xl">
                  Xác minh tài khoản thành công!
                  </h1>
                  <Button
                    onClick={() => router.push("/")}
                    className="bg-[#417505] hover:bg-[#65b10d]"
                  >
                   Trở về trang chủ
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
