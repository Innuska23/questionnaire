import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

const PaginationButton = styled.button`
  background-color: ${({ disabled }) =>
    disabled ? "#ccc" : "var(--primary-color)"};
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover:not(:disabled) {
    background-color: var(--hover-color);
  }
`;

const PageInfo = styled.span`
  margin: 0 15px;
  color: var(--secondary-color);
`;

export const S = {
  PaginationContainer,
  PaginationButton,
  PageInfo,
};
