import {
  useSensor,
  useSensors,
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCreateQuizForm } from "../../hooks/useCreateQuizForm";
import SortableQuestion from "../../components/SortableQuestion/SortableQuestion";
import QuestionFormField from "../../components/QuestionFormField/QuestionFormField";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Spinner from "../../components/Spinner/Spinner";

import { S } from "./CreateQuiz.styles";

const CreateQuiz = () => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, keyboardSensor);

  const {
    name,
    setName,
    description,
    setDescription,
    questions,
    error,
    loading,
    progressPercent,
    handleAddQuestion,
    handleRemoveQuestion,
    handleQuestionChange,
    handleTypeChange,
    handleOptionChange,
    handleAddOption,
    handleRemoveOption,
    handleReorder,
    handleSubmit,
    persistToLocalStorage,
  } = useCreateQuizForm();

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = questions.findIndex((q) => q.id === active.id);
    const newIndex = questions.findIndex((q) => q.id === over.id);
    handleReorder(oldIndex, newIndex);
  };

  const handleSave = async () => {
    try {
      await handleSubmit();
      toast.success("Quiz saved!");
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <S.Container>
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <S.Title>Create New Quiz</S.Title>
      </motion.div>

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ProgressBar percent={progressPercent} />
          <p>Saving your quiz... {Math.round(progressPercent)}%</p>
        </motion.div>
      )}

      <S.Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <QuestionFormField
          label="Quiz Name"
          name="Quiz Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            persistToLocalStorage(e.target.value, description, questions);
          }}
          placeholder="Enter quiz name"
          required
        />

        <QuestionFormField
          type="textarea"
          label="Description"
          name="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            persistToLocalStorage(name, e.target.value, questions);
          }}
          placeholder="Enter quiz description"
        />

        <S.QuestionsContainer>
          <S.QuestionsHeader>
            <h3>Questions</h3>
            <span>{questions.length} questions</span>
          </S.QuestionsHeader>

          {questions.length === 0 ? (
            <S.EmptyQuestions>
              <p>No questions yet. Add your first question below.</p>
            </S.EmptyQuestions>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={questions.map((q) => q.id)}
                strategy={verticalListSortingStrategy}
              >
                <AnimatePresence>
                  {questions.map((q, i) => (
                    <motion.div
                      key={q.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <SortableQuestion
                        question={q}
                        index={i}
                        onQuestionChange={handleQuestionChange}
                        onTypeChange={handleTypeChange}
                        onOptionChange={handleOptionChange}
                        onAddOption={handleAddOption}
                        onRemoveOption={handleRemoveOption}
                        onRemoveQuestion={handleRemoveQuestion}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </SortableContext>
            </DndContext>
          )}
        </S.QuestionsContainer>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <S.Button type="button" onClick={handleAddQuestion}>
            Add Question
          </S.Button>
        </motion.div>

        <S.Submit type="submit" disabled={questions.length === 0 || loading}>
          {loading ? (
            <>
              <Spinner size={14} />
              Saving...
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

export default CreateQuiz;
