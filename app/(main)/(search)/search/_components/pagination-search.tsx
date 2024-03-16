"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

type Props = {
  currentPage: number;
  maxPage: number;
  handlerChange: (i: number) => void;
};

export const PaginationSearch = ({
  currentPage,
  maxPage,
  handlerChange,
}: Props) => {
  return (
    <div className="pt-4">
      <Pagination>
        <PaginationContent>
          {[...Array(maxPage)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={currentPage === index + 1}
                onClick={() => handlerChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
