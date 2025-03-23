import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  input,
  textarea {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #4a90e2;
      box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1rem;
  background-color: #f1f1f1;
  border: 1px dashed #999;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  color: #333;
  transition: background-color 0.2s;
  width: fit-content;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const Submit = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  width: fit-content;

  &:hover:not(:disabled) {
    background-color: #357abd;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const Error = styled.div`
  color: #e74c3c;
  text-align: center;
  font-weight: 600;
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
