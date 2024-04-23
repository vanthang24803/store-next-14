"use client";

import * as z from "zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Profile } from "@/types";
import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import _http from "@/utils/http";
import { profileSchema } from "@/schema/auth";

interface UpdateFormProps {
  update: boolean;
  setUpdate: (update: boolean) => void;
  profile: Profile | undefined;
  id: string | undefined;
  token: string | undefined;
  fetchData: () => void;
}

type CreateFormValue = z.infer<typeof profileSchema>;

export const UpdateForm = ({
  update,
  setUpdate,
  profile,
  id,
  token,
  fetchData,
}: UpdateFormProps) => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: `${profile?.firstName}`,
      lastName: `${profile?.lastName}`,
      email: `${profile?.email}`,
    },
  });

  const onSubmit = async (data: CreateFormValue) => {
    try {
      setLoading(true);
      const response = await _http.put(`/api/auth/profile/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status == 200) {
        setLoading(false);
        setUpdate(!update);
        toast.success("Thành công");
        fetchData();
      } else {
        toast.success("Vui lòng thử lại");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col space-y-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />

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
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading} className="lg:w-1/3">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};
