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
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

type CreateFormValue = z.infer<typeof formSchema>;

export default function Login() {
  const router = useRouter();

  const { data: session } = useSession();

  if (session) {
    redirect("/");
  }

  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onSubmit = async (data: CreateFormValue) => {
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error(callback.error);
        }

        if (callback?.ok) {
          redirect("/");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {isClient && (
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
                        <span className="font-medium text-sm">
                          Email address
                        </span>
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
