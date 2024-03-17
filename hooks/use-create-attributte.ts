import axios from "axios";
import { useState } from "react";
import { Attribute } from "@/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/${attribute}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
