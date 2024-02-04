import React from "react";

const Pagination = ({
  handlePrevPage,
  handleNextPage,
  handlePagination,
  totalPage,
  queryData,
}) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handlePrevPage}
        className={`mx-2 px-3 py-2 border rounded-md ${
          queryData.page === 1
            ? "bg-gray-300 text-black cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
        }`}
        disabled={queryData.page === 1}
      >
        Previous
      </button>
      {[...Array(totalPage)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePagination(index + 1)}
          className={`mx-2 px-3 py-2 border rounded-md ${
            index + 1 === queryData.page
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black hover:bg-gray-400 focus:outline-none"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={handleNextPage}
        className={`mx-2 px-3 py-2 border rounded-md ${
          queryData.page === totalPage
            ? "bg-gray-300 text-black cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
        }`}
        disabled={queryData.page === totalPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
