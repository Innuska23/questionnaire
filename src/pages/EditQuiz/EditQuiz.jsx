import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { getQuestionnaireById, updateQuestionnaire } from "../../api/api";

import { S } from "../CreateQuiz/CreateQuiz.styles";

const SortableQuestion = ({ question, index, onChange, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <QuestionItem
        index={index}
        question={question}
        onChange={onChange}
        onRemove={onRemove}
      />
    </div>
  );
};

const EditQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    const load = async () => {
      const data = await getQuestionnaireById(id);
      setName(data.name);
      setDescription(data.description);
      setQuestions(
        data.questions.map((q) => ({
          id: uuidv4(),
          text: q.text,
          type: q.type,
          options: q.options.map((o) => o.text),
        }))
      );
    };
    load();
  }, [id]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = questions.findIndex((q) => q.id === active.id);
    const newIndex = questions.findIndex((q) => q.id === over.id);
    setQuestions(arrayMove(questions, oldIndex, newIndex));
  };

  const handleChange = (id, updates) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...updates } : q))
    );
  };

  const handleRemove = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleAdd = () => {
    setQuestions((prev) => [
      ...prev,
      { id: uuidv4(), text: "", type: "text", options: [] },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    try {
      await updateQuestionnaire(id, payload);
      navigate("/");
    } catch (err) {
      setError("Failed to update questionnaire");
    }
  };

  return (
    <S.Container>
      <S.Title>Edit Quiz</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <S.InputGroup>
          <label>Quiz Name</label>
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
                onChange={handleChange}
                onRemove={handleRemove}
              />
            ))}
          </SortableContext>
        </DndContext>

        <S.Button type="button" onClick={handleAdd}>
          Add Question
        </S.Button>
        <S.Submit type="submit">Save Changes</S.Submit>
        {error && <S.Error>{error}</S.Error>}
      </S.Form>
    </S.Container>
  );
};

export default EditQuiz;
