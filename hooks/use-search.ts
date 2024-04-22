import qs from "query-string";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "./use-debounce";
import _http from "@/utils/http";

export default function useSearch() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [searchLoading, setSearchLoading] = useState(false);

  const search = searchParams.get("search");

  const [content, setContent] = useState(search || "");

  const [product, setProduct] = useState<Product[]>([]);

  const debounce = useDebounce(content);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setSearchLoading(true);
        const response = await _http.get(`/api/product?Name=${debounce}`);
        setProduct(response.data);
        setSearchLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [debounce]);

  useEffect(() => {
    const query = {
      search: content,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  }, [router, content]);

  return { search, content, product, handleInputChange, router, searchLoading };
}
