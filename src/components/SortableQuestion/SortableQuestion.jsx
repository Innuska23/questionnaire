import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import QuestionItem from "../QuestionItem/QuestionItem";

const SortableQuestion = ({ question, index, ...handlers }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: question.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <QuestionItem
      question={question}
      index={index}
      onQuestionChange={handlers.onQuestionChange}
      onTypeChange={handlers.onTypeChange}
      onOptionChange={handlers.onOptionChange}
      onAddOption={handlers.onAddOption}
      onRemoveOption={handlers.onRemoveOption}
      onRemoveQuestion={handlers.onRemoveQuestion}
      isDraggable
      dragHandleProps={{ attributes, listeners }}
      nodeRef={setNodeRef}
      style={style}
    />
  );
};

export default SortableQuestion;
