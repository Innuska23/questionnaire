import styled from "styled-components";

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

const PaginationButton = styled.button`
  background-color: ${(props) => (props.disabled ? "#ccc" : "#4a90e2")};
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover:not(:disabled) {
    background-color: #357abd;
  }
`;

const PageInfo = styled.span`
  margin: 0 15px;
  color: #666;
`;

export const S = {
  Pagination,
  PaginationButton,
  PageInfo,
};
