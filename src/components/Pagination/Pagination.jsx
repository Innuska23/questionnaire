import React from "react";

import { S } from "./Pagination.styles";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <S.PaginationContainer>
      <S.PaginationButton onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous
      </S.PaginationButton>

      <S.PageInfo>
        Page {currentPage} of {totalPages}
      </S.PageInfo>

      <S.PaginationButton
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </S.PaginationButton>
    </S.PaginationContainer>
  );
};

export default Pagination;
