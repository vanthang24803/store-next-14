/* eslint-disable react-hooks/exhaustive-deps */
import { Review } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

type Props = {
  productId: string | undefined;
};

export default function useReview({ productId }: Props) {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      if (productId) {
        const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/product/${productId}/review`;

        try {
          setLoading(true);
          const response = await axios.get(URL);

          if (response.status === 200) {
            setReviews(response.data);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchReviews();
  }, [productId]);

  const images = reviews?.flatMap((review) => review.images);

  return {
    reviews,
    images,
    loading,
  };
}
