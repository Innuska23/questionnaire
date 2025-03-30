import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import { getQuestionnaireById, updateQuestionnaire } from "../api/api";
import { convertBackendType, convertFrontendType } from "../utils/questionType";
import Spinner from "../components/Spinner/Spinner";

export const useQuizForm = (id) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await getQuestionnaireById(id);
        setName(data.name || "");
        setDescription(data.description || "");
        setQuestions(
          data.questions.map((q) => ({
            id: q._id || uuidv4(),
            text: q.text || "",
            type: convertBackendType(q.type),
            options: q.options?.map((o) => o.text) || [],
          }))
        );
      } catch (err) {
        console.error(err);
        setError("Failed to load questionnaire");
      }
    };
    loadQuiz();
  }, [id]);

  const handleUpdateQuestion = (qid, updates) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === qid ? { ...q, ...updates } : q))
    );
  };

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { id: uuidv4(), text: "", type: "text", options: [] },
    ]);
  };

  const handleRemoveQuestion = (qid) => {
    setQuestions((prev) => prev.filter((q) => q.id !== qid));
  };

  const handleOptionChange = (qid, idx, value) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qid
          ? {
              ...q,
              options: q.options.map((opt, i) => (i === idx ? value : opt)),
            }
          : q
      )
    );
  };

  const handleAddOption = (qid) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qid ? { ...q, options: [...q.options, ""] } : q
      )
    );
  };

  const handleRemoveOption = (qid, idx) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qid
          ? {
              ...q,
              options: q.options.filter((_, i) => i !== idx),
            }
          : q
      )
    );
  };

  const handleReorder = (oldIndex, newIndex) => {
    const reordered = [...questions];
    const [moved] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, moved);
    setQuestions(reordered);
  };

  const handleSubmit = async () => {
    if (questions.length === 0) {
      setError("Quiz must contain at least one question.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name,
        description,
        questions: questions.map((q, i) => ({
          text: q.text,
          type: convertFrontendType(q.type),
          order: i + 1,
          options:
            q.type === "text"
              ? []
              : q.options
                  .filter((o) => o.trim())
                  .map((o) => ({ text: o.trim() })),
        })),
      };

      await updateQuestionnaire(id, payload);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

    if (loading) return <Spinner />;

  return {
    name,
    setName,
    description,
    setDescription,
    questions,
    error,
    loading,
    setError,
    handleUpdateQuestion,
    handleAddQuestion,
    handleRemoveQuestion,
    handleOptionChange,
    handleAddOption,
    handleRemoveOption,
    handleReorder,
    handleSubmit,
  };
};
