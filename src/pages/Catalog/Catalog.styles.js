import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SortSelect = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: var(--font-weight-500);

  &:hover {
    background-color: var(--hover-color);
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: var(--background-color);
  border-radius: 8px;

  p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    color: var (--secondary-color);
  }
`;

export const S = {
  Wrapper,
  Header,
  SortSelect,
  Button,
  Grid,
  EmptyState,
};
