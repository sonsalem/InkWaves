"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Pagination = ({
  totalBlogs,
  blogPerPage,
}: {
  totalBlogs: number;
  blogPerPage: number;
}) => {
  const pathName = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page")!)
    : 1;

  const totalPages = Math.ceil(totalBlogs / blogPerPage);

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 justify-center mt-6">
      <button onClick={() => createPageUrl(page - 1)} disabled={page <= 1}>
        <ChevronLeft />
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => createPageUrl(i + 1)}
          disabled={page == i + 1}
          className={`w-9 h-9 rounded-full text-sm font-medium transition-all
            ${
              page == i + 1
                ? "bg-main/70 text-white cursor-[default]"
                : "bg-main text-gray-700 hover:bg-gray-100 hover:shadow"
            }
          `}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => createPageUrl(page + 1)}
        disabled={page === totalPages}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
