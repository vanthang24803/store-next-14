/* eslint-disable react-hooks/exhaustive-deps */
import { Product } from "@/types";
import _http from "@/utils/http";
import { useEffect, useState } from "react";

type Props = {
  id: string | undefined;
};

export default function useFetchDetailProduct({ id }: Props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Product | null>(null);

  const fetchData = async () => {
    const response = await _http.get(`/api/product/${id}`);

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
    fetchData,
  };
}
