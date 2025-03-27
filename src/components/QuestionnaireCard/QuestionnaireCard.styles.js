import styled from "styled-components";

const Card = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px var(--box-shadow);
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 250px;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem 0;
`;

const Description = styled.p`
  color: var(--secondary-color);
  font-size: 0.95rem;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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
  color: ${({ color }) => color || "var(--primary-color)"};
  font-size: 1.1rem;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ color }) =>
      color === "var(--primary-color)"
        ? "var(--hover-color)"
        : color === "#286228;"
        ? "##135f13"
        : color === "red"
        ? "#b30000"
        : "var(--hover-color)"};
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
