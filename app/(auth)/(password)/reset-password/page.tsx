"use client";

import * as z from "zod";
import { Logo } from "@/components/logo";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import useClient from "@/hooks/use-client";
import { resetPasswordSchema } from "@/schema/auth";
import _http from "@/utils/http";

type CreateFormValue = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const userId = searchParams.get("userId");

  const token = searchParams.get("token");

  const tokenVerify = token?.replaceAll(" ", "+");

  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: CreateFormValue) => {
    const dataSend = {
      newPassword: data.password,
    };

    try {
      setLoading(true);
      const response = await _http.post(
        `/api/auth/reset-password?userId=${userId}&token=${encodeURIComponent(
          tokenVerify || ""
        )}`,
        dataSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        toast.success("Success");
        setLoading(false);
        router.push("/login");
      } else {
        toast.error("Something went wrong");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const { isClient } = useClient();

  if (!isClient) return null;

  return (
    <div className="md:w-[400px] w-[360px] py-4 px-6 bg-white/90 rounded-lg  flex flex-col space-y-5">
      <Logo />

      <div className="flex flex-col">
        <h2 className="text-xl font-semibold">Reset Password</h2>
        <span className="text-neutral-800 text-sm">
          to continue to AMAK Store
        </span>
      </div>

      <FormProvider {...form}>
        <form
          className="flex flex-col space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium text-sm">Password</span>
                    <Input {...field} autoComplete="off" type="password" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </form>
      </FormProvider>

      <div className="flex items-center space-x-2 text-sm">
        <span className="mt-4 text-neutral-600">No account?</span>
        <span
          className="mt-4 text-blue-600 hover:cursor-pointer"
          onClick={() => router.push("/register")}
        >
          Create now
        </span>
      </div>
    </div>
  );
}
