import { Attribute } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import useFetchProduct from "./use-fetch-product";

type Props = {
  id: string;
  attribute: Attribute;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export default function useDeleteAttribute({
  id,
  attribute,
  setLoading,
  setOpen,
}: Props) {
  const router = useRouter();

  const { fetchData } = useFetchProduct({
    attribute,
  });
  const attributeCapitalized =
    attribute.charAt(0).toUpperCase() + attribute.slice(1);

  const onDelete = async () => {
    toast.loading("Waiting");
    try {
      setLoading(true);
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/${attribute}/${id}`
      );

      if (response.status == 200) {
        toast.dismiss();
        toast.success(`${attributeCapitalized} deleted.`);
        fetchData();
        router.push(`/dashboard/${attribute}`);
      }
    } catch (error) {
      toast.dismiss();
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      toast.dismiss();
      setOpen(false);
      setLoading(false);
    }
  };

  return { onDelete };
}
