/* eslint-disable react-hooks/exhaustive-deps */
import { Attribute } from "@/types";
import _http from "@/utils/http";
import { useEffect, useState } from "react";

type Props = {
  id: string;
  attribute: Attribute;
};

export default function useFetchAttribute<T>({ id, attribute }: Props) {
  const [data, setData] = useState<T | null>(null);

  const fetchData = async () => {
    const response = await _http.get(`/api/product/${attribute}/${id}`);

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
