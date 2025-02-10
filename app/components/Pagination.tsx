import React from "react";
import { useStore } from "../store/store";

const Pagination = () => {
  const page = useStore((state) => state.page);
  const setPage = useStore((state) => state.setPage);
  const numPage = useStore((state) => state.numPage);
  const total = useStore((state) => state.total);

  const totalPages = Math.ceil(total / numPage);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const leftPages = [];
  const rightPages = [];

  for (let i = Math.max(page - 2, 1); i < page; i++) {
    leftPages.push(i);
  }

  for (let i = page + 1; i <= Math.min(page + 2, totalPages); i++) {
    rightPages.push(i);
  }

  const pageNumbers = [
    ...leftPages,
    page,
    ...rightPages,
  ];

  return (
    <div className="p-8 flex items-center justify-center">
      <button
        className={`${page <= 1 ? "bg-gray-300 hover:bg-gray-300":"bg-blue-500 hover:bg-blue-700" } text-white font-bold py-2 px-4 m-4 rounded`}
        onClick={handlePrevious}
        disabled={page <= 1}
      >
        Previous
      </button>

      <div className="flex gap-2">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`px-3 py-2 rounded-md font-semibold ${
              page === pageNumber
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 hover:bg-blue-100"
            }`}
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button
          className={`${page >= totalPages ? "bg-gray-300 hover:bg-gray-300":"bg-blue-500 hover:bg-blue-700" } text-white font-bold py-2 px-4 m-4 rounded`}

        onClick={handleNext}
        disabled={page >= totalPages}
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;
