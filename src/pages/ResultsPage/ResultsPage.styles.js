import styled from "styled-components";

const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

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
  background-color: #f9f9f9;

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
    color: #333;
  }
`;

const Center = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.1rem;
  color: #888;
`;

export const S = {
  Container,
  Card,
  Center,
};
