import axios from "axios";
import qs from "query-string";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function useSearch() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  const [content, setContent] = useState(search || "");

  const [product, setProduct] = useState<Product[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/product?Name=${content}`
        );
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [content]);

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

  return { search, content, product, handleInputChange, router };
}
