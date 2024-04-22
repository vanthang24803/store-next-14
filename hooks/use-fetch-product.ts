/* eslint-disable react-hooks/exhaustive-deps */
import { Attribute } from "@/types";
import _http from "@/utils/http";
import { useEffect, useState } from "react";

type Props = {
  attribute: Attribute;
};

export default function useFetchProduct<T>({ attribute }: Props) {
  const [data, setData] = useState<T[] | null>(null);

  const fetchData = async () => {
    const response = await _http.get(`/api/product/${attribute}`);

    if (response.status == 200) {
      setData(response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    fetchData,
  };
}
