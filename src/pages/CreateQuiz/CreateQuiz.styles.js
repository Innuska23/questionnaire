import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px var(box-shadow);
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
    font-weight: var(--font-weight-600);
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
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
`;

const QuestionsContainer = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background-color: var(--background-color);
  border-radius: 8px;
`;

const QuestionsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h3 {
    margin: 0;
  }

  span {
    color: #666;
    font-size: 0.9rem;
  }
`;

const EmptyQuestions = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: #f1f1f1;
  border-radius: 6px;
  margin: 1rem 0;

  p {
    color: var(--secondary-color);
    margin: 0;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1rem;
  background-color: #f1f1f1;
  border: 1px dashed #999;
  border-radius: 6px;
  cursor: pointer;
  font-weight: var(--font-weight-600);
  color: var(--text-color);
  transition: background-color 0.2s;
  width: fit-content;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const Submit = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: var(--font-weight-600);
  cursor: pointer;
  transition: background-color 0.2s;
  width: fit-content;

  &:hover:not(:disabled) {
    background-color: var(--hover-color);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Error = styled.div`
  color: var(--error-color);
  text-align: center;
  font-weight: var(--font-weight-600);
`;

export const S = {
  Container,
  Title,
  Form,
  InputGroup,
  Button,
  Submit,
  Error,
  QuestionsContainer,
  QuestionsHeader,
  EmptyQuestions,
};
