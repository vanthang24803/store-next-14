/* eslint-disable react-hooks/exhaustive-deps */
import { Product } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

type Props = {
  id: string | undefined;
};

export default function useFetchDetailProduct({ id }: Props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Product | null>(null);

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`
    );

    if (response.status == 200) {
      setData(response.data);
      console.log(response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    loading,
    setLoading,
    data,
    fetchData
  };
}
