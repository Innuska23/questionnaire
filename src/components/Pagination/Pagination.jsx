import { motion } from "framer-motion";

import { S } from "./Pagination.styles";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <S.PaginationContainer>
      <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
        <S.PaginationButton
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </S.PaginationButton>
      </motion.div>

      <S.PageInfo>
        Page {currentPage} of {totalPages}
      </S.PageInfo>

      <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
        <S.PaginationButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </S.PaginationButton>
      </motion.div>
    </S.PaginationContainer>
  );
};

export default Pagination;
