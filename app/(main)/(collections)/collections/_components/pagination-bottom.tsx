"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

export const BottomPagination = ({
  pageCount,
  currentPage,
  handlePageChange,
}: {
  pageCount: number;
  currentPage: number;
  handlePageChange: (i: number) => void;
}) => {
  return (
    <Pagination>
      <PaginationContent>
        {[...Array(pageCount)].map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => {
                handlePageChange(i + 1);
              }}
              isActive={i + 1 === currentPage}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
};
