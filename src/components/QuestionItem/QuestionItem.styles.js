import styled from "styled-components";

const QuestionContainer = styled.div`
  border: 1px solid #eee;
  padding: 1rem;
  border-radius: 8px;
  background-color: #fafafa;
  margin-bottom: 1.5rem;
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuestionTitle = styled.h4`
  margin: 0;
  font-size: 1.1rem;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 1.1rem;
  cursor: pointer;

  &:hover {
    color: #c0392b;
  }
`;

const FormGroup = styled.div`
  margin-top: 1rem;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 1rem;
  display: block;
  margin-bottom: 0.5rem;
`;

const TextInput = styled.input`
  padding: 0.6rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 0.6rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

export const S = {
  QuestionContainer,
  QuestionHeader,
  QuestionTitle,
  DeleteButton,
  FormGroup,
  Label,
  TextInput,
  Select,
};
