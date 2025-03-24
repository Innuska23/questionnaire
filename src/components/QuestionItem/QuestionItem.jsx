import React from "react";
import { FaTrash, FaGripVertical } from "react-icons/fa";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import QuestionFormField from "../QuestionFormField/QuestionFormField";
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
  isDraggable = false,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: question.id,
      disabled: !isDraggable,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleTextChange = (e) => {
    onQuestionChange(question.id, "text", e.target.value);
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    onTypeChange(question.id, newType);
  };

  return (
    <S.QuestionContainer
      ref={isDraggable ? setNodeRef : null}
      style={isDraggable ? style : {}}
    >
      <S.QuestionHeader>
        {isDraggable && (
          <S.DragHandle {...attributes} {...listeners}>
            <FaGripVertical />
          </S.DragHandle>
        )}
        <S.QuestionTitle>Question {index + 1}</S.QuestionTitle>
        <S.DeleteButton
          onClick={() => onRemoveQuestion(question.id)}
          title="Delete question"
        >
          <FaTrash />
        </S.DeleteButton>
      </S.QuestionHeader>

      <QuestionFormField
        label="Question Text"
        value={question.text}
        onChange={handleTextChange}
        placeholder="Enter question text"
        required={true}
      />

      <QuestionFormField
        type="select"
        label="Question Type"
        value={question.type}
        onChange={handleTypeChange}
        options={[
          { value: "text", label: "Text" },
          { value: "radio", label: "Single Choice" },
          { value: "checkbox", label: "Multiple Choice" },
        ]}
      />

      {question.text.trim() &&
        (question.type === "radio" || question.type === "checkbox") && (
          <OptionList
            options={question.options}
            questionId={question.id}
            onOptionChange={onOptionChange}
            onAddOption={onAddOption}
            onRemoveOption={onRemoveOption}
          />
        )}
    </S.QuestionContainer>
  );
};

export default QuestionItem;
