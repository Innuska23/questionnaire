import styled from "styled-components";

const Card = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem 0;
`;

const Description = styled.p`
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 1rem;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 1rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;

const IconBtn = styled.button`
  background: none;
  border: none;
  color: #4a90e2;
  font-size: 1.1rem;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #357abd;
  }
`;

export const S = {
  Card,
  Title,
  Description,
  Meta,
  Actions,
  IconBtn,
};
