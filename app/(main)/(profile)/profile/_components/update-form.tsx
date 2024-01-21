"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Profile } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface UpdateFormProp {
  update: boolean;
  setUpdate: (update: boolean) => void;
  profile: Profile | undefined;
  id: string | undefined;
  token: string | undefined;
}

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().min(1),
  address: z.string().min(1),
});

type CreateFormValue = z.infer<typeof formSchema>;

export const UpdateForm = ({
  update,
  setUpdate,
  profile,
  id,
  token,
}: UpdateFormProp) => {

  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: `${profile?.firstName}`,
      lastName: `${profile?.lastName}`,
      email: `${profile?.email}`,
      address: `${profile?.address}`,
    },
  });

  const onSubmit = async (data: CreateFormValue) => {
    try {
        setLoading(true);
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile/${id}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
               Authorization: `Bearer ${token}` 
            },
          }
        );
  
        if (response.status == 200) {
          setLoading(false);
          setUpdate(!update);
          toast.success("Thành công")
        } else {
          toast.success("Vui lòng thử lại")
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col space-y-1">
                  <span className="font-medium text-sm">Address</span>
                  <Input {...field} autoComplete="off" />
                </div>
              </FormControl>
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
