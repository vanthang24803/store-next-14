"use client";

import * as z from "zod";
import { Logo } from "@/components/logo";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.string().min(1),
});

type CreateFormValue = z.infer<typeof formSchema>;

export default function ForgotPassword() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: CreateFormValue) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        setLoading(false);
        toast.success("Check your email!");
      } else {
        toast.error("Something went wrong");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <div className="md:w-[400px] w-[360px] py-4 px-6 bg-white/90 rounded-lg  flex flex-col space-y-5">
          <Logo />

          <div className="flex flex-col">
            <h2 className="text-xl font-semibold">Forgot Password</h2>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col space-y-1">
                        <span className="font-medium text-sm">
                          Email address
                        </span>
                        <Input {...field} autoComplete="off" />
                      </div>
                    </FormControl>
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
      )}
    </>
  );
}
