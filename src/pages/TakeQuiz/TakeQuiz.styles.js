import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: var(--box-shadow);

  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: var(--font-weight-600);
    margin-bottom: 0.25rem;
  }

  input[type="text"] {
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
  }

  input[type="radio"],
  input[type="checkbox"] {
    margin-right: 0.5rem;
  }
`;

const SubmitBtn = styled.button`
  background-color: var(--primary-color);
  color: white;
  font-weight: var(--font-weight-600);
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  align-self: flex-end;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--hover-color);
  }
`;

const Result = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  background: #f8f8f8;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;

  h2 {
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-top: 2rem;
    text-align: center;
  }

  li {
    margin-bottom: 0.75rem;
  }
`;

export const S = {
  Container,
  Block,
  SubmitBtn,
  Result,
};
