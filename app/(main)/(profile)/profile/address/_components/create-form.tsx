"use client";

import * as z from "zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { FormProvider, useForm } from "react-hook-form";
import useAuth from "@/hooks/use-auth";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import _http from "@/utils/http";

const formSchema = z.object({
  name: z.string().min(1),
});

type Props = {
  setUCreate: Dispatch<SetStateAction<boolean>>;
  fetchAddress: () => void;
};

type CreateFormValue = z.infer<typeof formSchema>;

export const CreateAddressForm = ({ setUCreate, fetchAddress }: Props) => {
  const auth = useAuth();

  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CreateFormValue) => {
    try {
      setLoading(true);
      const response = await _http.post(
        `/api/auth/profile/${auth.user?.id}/address`,
        data
      );

      if (response.status == 200) {
        toast.success("Thành công");
        setUCreate(false);
        fetchAddress();
      } else {
        toast.success("Vui lòng thử lại");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col space-y-1">
                  <span className="font-medium text-sm">Địa chỉ:</span>
                  <Input {...field} autoComplete="off" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-[200px]" disabled={loading}>
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};
