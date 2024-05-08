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
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
import { loginSchema } from "@/schema/auth";

import { SocialButton } from "@/components/social-button";
import useSocialLogin from "@/hooks/use-social-login";
import useClient from "@/hooks/use-client";

type CreateFormValue = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();

  const authStore = useAuth();

  const { isClient } = useClient();

  const [loading, setLoading] = useState(false);

  const { loginWithGoogle, loginWithFacebook } = useSocialLogin();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: CreateFormValue) => {
    setLoading(true);

    const { email, password } = data;

    try {
      await authStore.login(email, password);
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authStore.token) {
      redirect("/");
    }
  }, [authStore.token]);

  if (!isClient) return null;

  return (
    <div className="md:w-[400px] w-[360px] py-4 px-6 bg-white/90 rounded-lg  flex flex-col space-y-5">
      <Logo />
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold">Login</h2>
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
                    <span className="font-medium text-sm">Email address</span>
                    <Input
                      {...field}
                      autoComplete="off"
                      placeholder="mail@example.com"
                    />
                  </div>
                </FormControl>
                <FormMessage />
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
                    <Input
                      type="password"
                      {...field}
                      autoComplete="off"
                      placeholder="Password"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <span
            className="text-end text-[12px] hover:cursor-pointer hover:underline"
            onClick={() => router.push(`/forgot-password`)}
          >
            Forgot password
          </span>

          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </form>
      </FormProvider>

      <div className="flex flex-col gap-2">
        <SocialButton provider="google" size={18} onClick={loginWithGoogle} />

        <SocialButton
          provider="facebook"
          size={18}
          onClick={loginWithFacebook}
        />
      </div>

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
