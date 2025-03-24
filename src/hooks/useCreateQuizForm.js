import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { createQuestionnaire } from "../api/api";
import { convertFrontendType } from "../utils/questionType";

const LOCAL_STORAGE_KEY = "quiz_draft";

export const useCreateQuizForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      setName(data.name || "");
      setDescription(data.description || "");
      setQuestions(data.questions || []);
    }
  }, []);

  useEffect(() => {
    let filledFields = 0;
    let totalFields = 2;

    if (name.trim()) filledFields++;
    if (description.trim()) filledFields++;

    questions.forEach((q) => {
      totalFields += 2;
      if (q.text.trim()) filledFields++;
      if (q.type) filledFields++;

      if (q.type === "single" || q.type === "multiple") {
        totalFields += q.options.length;
        q.options.forEach((opt) => {
          if (opt.trim()) filledFields++;
        });
      }
    });

    const percent = totalFields > 0 ? (filledFields / totalFields) * 100 : 0;
    setProgressPercent(percent);
  }, [name, description, questions]);

  const persistToLocalStorage = (nameVal, descVal, qs) => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ name: nameVal, description: descVal, questions: qs })
    );
  };

  const handleAddQuestion = () => {
    const newQuestions = [
      ...questions,
      { id: uuidv4(), text: "", type: "text", options: [] },
    ];
    setQuestions(newQuestions);
    persistToLocalStorage(name, description, newQuestions);
  };

  const handleRemoveQuestion = (id) => {
    const updated = questions.filter((q) => q.id !== id);
    setQuestions(updated);
    persistToLocalStorage(name, description, updated);
  };

  const handleQuestionChange = (id, field, value) => {
    const updated = questions.map((q) =>
      q.id === id ? { ...q, [field]: value } : q
    );
    setQuestions(updated);
    persistToLocalStorage(name, description, updated);
  };

  const handleTypeChange = (id, newType) => {
    const updated = questions.map((q) => {
      if (q.id !== id) return q;
      return {
        ...q,
        type: newType,
        options:
          newType === "text" ? [] : q.options.length ? q.options : ["", ""],
      };
    });
    setQuestions(updated);
    persistToLocalStorage(name, description, updated);
  };

  const handleOptionChange = (id, optIdx, value) => {
    const updated = questions.map((q) => {
      if (q.id !== id) return q;
      const options = [...q.options];
      options[optIdx] = value;
      return { ...q, options };
    });
    setQuestions(updated);
    persistToLocalStorage(name, description, updated);
  };

  const handleAddOption = (id) => {
    const updated = questions.map((q) =>
      q.id === id ? { ...q, options: [...q.options, ""] } : q
    );
    setQuestions(updated);
    persistToLocalStorage(name, description, updated);
  };

  const handleRemoveOption = (id, optIdx) => {
    const updated = questions.map((q) => {
      if (q.id !== id) return q;
      const options = q.options.filter((_, i) => i !== optIdx);
      return { ...q, options };
    });
    setQuestions(updated);
    persistToLocalStorage(name, description, updated);
  };

  const handleReorder = (oldIndex, newIndex) => {
    const reordered = [...questions];
    const [moved] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, moved);
    setQuestions(reordered);
    persistToLocalStorage(name, description, reordered);
  };

  const handleSubmit = async () => {
    if (questions.length === 0) {
      setError("Quiz must contain at least one question.");
      return;
    }

    try {
      setLoading(true);

      const progressInterval = setInterval(() => {
        setProgressPercent((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 5;
        });
      }, 200);

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
                  .filter((opt) => opt.trim())
                  .map((opt) => ({ text: opt.trim() })),
        })),
      };

      await createQuestionnaire(payload);
      clearInterval(progressInterval);
      setProgressPercent(100);
      localStorage.removeItem(LOCAL_STORAGE_KEY);

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong.");
      setLoading(false);
      setProgressPercent(0);
    }
  };

  return {
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
  };
};
