import React from "react";
import { useParams } from "react-router-dom";
import { useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ClipLoader from "react-spinners/ClipLoader";

import { useQuizForm } from "../../hooks/useQuizForm";
import SortableQuestion from "../../components/SortableQuestion/SortableQuestion";

import { S } from "./EditQuiz.styles";

const EditQuiz = () => {
  const { id } = useParams();
  const sensors = useSensors(useSensor(PointerSensor));

  const {
    name,
    setName,
    description,
    setDescription,
    questions,
    error,
    loading,
    handleUpdateQuestion,
    handleAddQuestion,
    handleRemoveQuestion,
    handleOptionChange,
    handleAddOption,
    handleRemoveOption,
    handleReorder,
    handleSubmit,
  } = useQuizForm(id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = questions.findIndex((q) => q.id === active.id);
    const newIndex = questions.findIndex((q) => q.id === over.id);
    handleReorder(oldIndex, newIndex);
  };

  return (
    <S.Container>
      <S.Title>Edit Quiz</S.Title>
      <S.Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
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
                onTypeChange={(id, newType) =>
                  handleUpdateQuestion(id, {
                    type: newType,
                    options: newType === "text" ? [] : ["", ""],
                  })
                }
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

        <S.Submit type="submit" disabled={questions.length === 0 || loading}>
          {loading ? (
            <>
              <ClipLoader size={14} color="#fff" /> Saving...
            </>
          ) : (
            "Save Quiz"
          )}
        </S.Submit>

        {error && <S.Error>{error}</S.Error>}
      </S.Form>
    </S.Container>
  );
};

export default EditQuiz;
