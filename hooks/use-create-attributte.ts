import { useState } from "react";
import { Attribute } from "@/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import _http from "@/utils/http";

type Props = {
  attribute: Attribute;
};

export default function useCreateAttribute<T>({ attribute }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: T) => {
    toast.loading("Waiting");
    try {
      setLoading(true);

      const response = await _http.post(`/api/product/${attribute}`, data);
      if (response.status == 200) {
        toast.dismiss();
        toast.success("Success");
        setLoading(false);
        router.push(`/dashboard/${attribute}`);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong!");
      console.error(error);
      setLoading(false);
    }
  };

  return { loading, onSubmit };
}
