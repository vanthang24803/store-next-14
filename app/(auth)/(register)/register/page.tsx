"use client";

import * as z from "zod";
import { Logo } from "@/components/logo";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import useAuth from "@/hooks/use-auth";

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().min(1),
  password: z.string().min(1),
});

type CreateFormValue = z.infer<typeof formSchema>;

export default function Register() {
  const router = useRouter();

  const auth = useAuth();

  if (auth.token) {
    redirect("/");
  }

  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onSubmit = async (data: CreateFormValue) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        toast.success("Verify your email");
        setLoading(false);
      } else {
        toast.error("Something went wrong");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="md:w-[400px] w-[360px] py-4 px-6 bg-white/90 rounded-lg  flex flex-col space-y-5">
      <Logo />

      <div className="flex flex-col">
        <h2 className="text-xl font-semibold">Register</h2>
        <span className="text-neutral-800 text-sm">
          to continue to AMAK Store
        </span>
      </div>

      <FormProvider {...form}>
        <form
          className="flex flex-col space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex items-center justify-between space-x-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col space-y-1">
                      <span className="font-medium text-sm">First name</span>
                      <Input {...field} autoComplete="off" />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col space-y-1">
                      <span className="font-medium text-sm">Last name</span>
                      <Input {...field} autoComplete="off" />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium text-sm">Email address</span>
                    <Input {...field} autoComplete="off" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium text-sm">Password</span>
                    <Input type="password" {...field} autoComplete="off" />
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
        <span className="mt-4 text-neutral-600">Have account?</span>
        <span
          className="mt-4 text-blue-600 hover:cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Login now
        </span>
      </div>
    </div>
  );
}
