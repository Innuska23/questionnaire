import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import QuestionItem from "../../components/QuestionItem/QuestionItem";
import { createQuestionnaire } from "../../api/api";

import { S } from "./CreateQuiz.styles";

const SortableQuestion = ({ question, index, ...handlers }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: question.id });

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

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { id: uuidv4(), text: "", type: "text", options: [] },
    ]);
  };

  const handleRemoveQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleUpdateQuestion = (id, updates) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...updates } : q))
    );
  };

  const handleTypeChange = (id, newType) => {
    handleUpdateQuestion(id, {
      type: newType,
      options: newType === "text" ? [] : ["", ""],
    });
  };

  const handleOptionChange = (id, optIdx, value) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== id) return q;
        const options = [...q.options];
        options[optIdx] = value;
        return { ...q, options };
      })
    );
  };

  const handleAddOption = (id) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, options: [...q.options, ""] } : q))
    );
  };

  const handleRemoveOption = (id, optIdx) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== id) return q;
        const options = q.options.filter((_, i) => i !== optIdx);
        return { ...q, options };
      })
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = questions.findIndex((q) => q.id === active.id);
    const newIndex = questions.findIndex((q) => q.id === over.id);
    setQuestions(arrayMove(questions, oldIndex, newIndex));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (questions.length === 0) {
      setError("Quiz must contain at least one question.");
      return;
    }

    try {
      const payload = {
        name,
        description,
        questions: questions.map((q, i) => ({
          text: q.text,
          type: q.type,
          order: i + 1,
          options: q.type === "text" ? [] : q.options.map((o) => ({ text: o })),
        })),
      };
      await createQuestionnaire(payload);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <S.Container>
      <S.Title>Create New Quiz</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <S.InputGroup>
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </S.InputGroup>

        <S.InputGroup>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </S.InputGroup>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={questions.map((q) => q.id)}
            strategy={verticalListSortingStrategy}
          >
            {questions.map((q, i) => (
              <SortableQuestion
                key={q.id}
                question={q}
                index={i}
                onQuestionChange={(id, field, value) =>
                  handleUpdateQuestion(id, { [field]: value })
                }
                onTypeChange={handleTypeChange}
                onOptionChange={handleOptionChange}
                onAddOption={handleAddOption}
                onRemoveOption={handleRemoveOption}
                onRemoveQuestion={handleRemoveQuestion}
              />
            ))}
          </SortableContext>
        </DndContext>

        <S.Button type="button" onClick={handleAddQuestion}>
          Add Question
        </S.Button>

        <S.Submit type="submit" disabled={questions.length === 0}>
          Save Quiz
        </S.Submit>
        {error && <S.Error>{error}</S.Error>}
      </S.Form>
    </S.Container>
  );
};

export default CreateQuiz;
