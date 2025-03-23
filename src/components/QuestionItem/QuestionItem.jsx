import React from "react";
import { FaTrash } from "react-icons/fa";

import OptionList from "../OptionList/OptionList";

import { S } from "./QuestionItem.styles";

const QuestionItem = ({
  question,
  index,
  onQuestionChange,
  onTypeChange,
  onOptionChange,
  onAddOption,
  onRemoveOption,
  onRemoveQuestion,
}) => {
  const handleTextChange = (e) => {
    onQuestionChange(question.id, "text", e.target.value);
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    onTypeChange(question.id, newType);
  };

  return (
    <S.QuestionContainer>
      <S.QuestionHeader>
        <S.QuestionTitle>Question {index + 1}</S.QuestionTitle>
        <S.DeleteButton
          onClick={() => onRemoveQuestion(question.id)}
          title="Delete question"
        >
          <FaTrash />
        </S.DeleteButton>
      </S.QuestionHeader>

      <S.FormGroup>
        <S.Label>Question Text</S.Label>
        <S.TextInput
          value={question.text}
          onChange={handleTextChange}
          placeholder="Enter question text"
          required
        />
      </S.FormGroup>

      <S.FormGroup>
        <S.Label>Question Type</S.Label>
        <S.Select value={question.type} onChange={handleTypeChange}>
          <option value="text">Text</option>
          <option value="single">Single Choice</option>
          <option value="multiple">Multiple Choice</option>
        </S.Select>
      </S.FormGroup>

      {question.text.trim() &&
        (question.type === "single" || question.type === "multiple") && (
          <OptionList
            options={question.options}
            questionIndex={index}
            onOptionChange={(qIdx, optIdx, val) =>
              onOptionChange(question.id, optIdx, val)
            }
            onAddOption={() => onAddOption(question.id)}
            onRemoveOption={(optIdx) => onRemoveOption(question.id, optIdx)}
          />
        )}
    </S.QuestionContainer>
  );
};

export default QuestionItem;
