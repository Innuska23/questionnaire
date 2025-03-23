import styled from "styled-components";

const OptionsWrapper = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed #ccc;
`;

const Label = styled.h4`
  margin-bottom: 0.75rem;
  font-size: 1rem;
  color: #444;
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const OptionInput = styled.input`
  flex-grow: 1;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.4rem;

  &:hover {
    color: #c0392b;
  }
`;

const AddBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border: 1px dashed #888;
  background: none;
  color: #555;
  font-size: 0.95rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const S = {
  OptionsWrapper,
  Label,
  OptionItem,
  OptionInput,
  RemoveBtn,
  AddBtn,
};
