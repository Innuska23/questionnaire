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
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <QuestionItem question={question} index={index} {...handlers} />
    </div>
  );
};

export default SortableQuestion;
