import styled from "styled-components";

const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: var(--box-shadow);

  h2 {
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 2rem;
    color: #555;
  }
`;

const Card = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  background-color: var(--background-color);

  h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  ul {
    list-style: none;
    padding-left: 0;
    margin-top: 1rem;
  }

  li {
    margin-bottom: 0.5rem;
    color: var(--text-color);
  }
`;

export const S = {
  Container,
  Card,
};
