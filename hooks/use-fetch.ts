/* eslint-disable react-hooks/exhaustive-deps */
import { get } from "@/lib/api";
import { useEffect, useState } from "react";

type Props = {
  url: string;
};

export default function useFetch<T>({ url }: Props) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [api, setApi] = useState(url);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await get(api);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (e: any) {
      setError(e);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    loading,
    data,
    error,
    setApi,
  };
}
