import styled from "styled-components";

const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: var(--box-shadow);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.5rem;
    font-weight: var(--font-weight-600);
    color: #444;
  }

  input,
  textarea {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const Button = styled.button`
  background-color: #f1f1f1;
  color: var(--text-color);
  border: 1px dashed #aaa;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  width: fit-content;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e1e1e1;
  }
`;

const Submit = styled.button`
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: var(--font-weight-600);
  cursor: pointer;
  border: none;
  align-self: flex-end;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--hover-color);
  }
`;

const Error = styled.p`
  color: var(--error-color);
  font-weight: var(--font-weight-500);
  text-align: center;
`;

export const S = {
  Container,
  Title,
  Form,
  InputGroup,
  Button,
  Submit,
  Error,
};
