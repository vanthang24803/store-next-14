/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { Spinner } from "@/components/spinner";
import useClient from "@/hooks/use-client";
import useAuth from "@/hooks/use-auth";

export default function VerifyEmail() {
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  const { isClient } = useClient();
  const auth = useAuth();


  useEffect(() => {
    try {
      setLoading(true);
      if (token) {
        auth.verifyEmail(userId, encodeURIComponent(token.replaceAll(" ", "+")));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (auth.token) {
    redirect("/");
  }

  return (
    <>
      {isClient && (
        <div className="md:w-[500px] w-[360px] min-h-[200px] py-4 px-6 bg-white/90 rounded-lg  flex flex-col space-y-1">
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
