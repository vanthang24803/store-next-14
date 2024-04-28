"use client";

import { Review } from "@/types";
import { useEffect, useState } from "react";
import { ListFilter } from "./list-filter-reviews";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ReviewContent } from "./review-content";
import { BottomPagination } from "@/app/(main)/(collections)/collections/_components/pagination-bottom";
import _http from "@/utils/http";

export const ReviewFilter = ({ id }: { id: string | undefined }) => {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [status, setStatus] = useState("Lasted");
  const [star, setStar] = useState<number | null>(null);

  const onChangeStatus = (status: string) => {
    setStatus(status);
  };
  const onChangeStar = (star: number | null) => {
    setStar(star);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      if (id) {
        let URL = `/api/product/${id}/review?Status=${status}`;

        if (star) {
          URL += `&Star=${star}`;
        }

        try {
          const response = await _http.get(URL);
          if (response.status === 200) {
            setReviews(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchReviews();
  }, [id, star, status]);

  const [currentPage, setCurrentPage] = useState(1);

  const pageCount = reviews ? Math.ceil(reviews.length / 5) : 0;
  const currentData = reviews
    ? reviews.slice((currentPage - 1) * 5, currentPage * 5)
    : [];
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-col">
      <h2 className="font-bold tracking-wide">Lọc theo</h2>
      <ListFilter onChangeStatus={onChangeStatus} onChangeStar={onChangeStar} />
      <Separator className="my-4" />
      {reviews && reviews.length > 0 ? (
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-3">
            {currentData.map((item) => (
              <ReviewContent key={item.id} review={item} />
            ))}
          </div>
          <div className="flex justify-end">
            <BottomPagination
              currentPage={currentPage}
              pageCount={pageCount}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col space-y-3 ">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/6381/6381554.png"
            width={60}
            height={60}
            alt="icon"
          />
          <p className="text-center text-sm  tracking-tight">
            Không tìm thấy nhận xét phù hợp.
          </p>
        </div>
      )}
    </div>
  );
};
