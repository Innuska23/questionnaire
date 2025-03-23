import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getQuestionnaireById, submitResponse } from "../../api/api";

import { S } from "./TakeQuiz.styles";

const TakeQuiz = () => {
  const { id } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [answers, setAnswers] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const data = await getQuestionnaireById(id);
      setQuestionnaire(data);
      setStartTime(Date.now());

      const saved = localStorage.getItem(`quiz-${id}`);
      if (saved) {
        setAnswers(JSON.parse(saved));
      }
    };
    loadData();
  }, [id]);

  const handleChange = (qid, value) => {
    const updated = { ...answers, [qid]: value };
    setAnswers(updated);
    localStorage.setItem(`quiz-${id}`, JSON.stringify(updated));
  };

  const handleCheckbox = (qid, option) => {
    const prev = answers[qid] || [];
    const updated = prev.includes(option)
      ? prev.filter((o) => o !== option)
      : [...prev, option];
    handleChange(qid, updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);

    const payload = {
      questionnaireId: id,
      completionTime: timeTaken,
      answers: questionnaire.questions.map((q) => ({
        questionId: q._id,
        answer: answers[q._id] || (q.type.includes("choice") ? [] : ""),
      })),
    };

    await submitResponse(payload);
    localStorage.removeItem(`quiz-${id}`);
    setSubmitted(true);
    setDuration(timeTaken);
  };

  if (!questionnaire) return <p>Loading...</p>;
  if (submitted)
    return (
      <S.Result>
        <h2>Thank you!</h2>
        <p>You finished in {duration} seconds.</p>
        <h3>Your Answers:</h3>
        <ul>
          {questionnaire.questions.map((q) => (
            <li key={q._id}>
              <strong>{q.text}:</strong> {JSON.stringify(answers[q._id])}
            </li>
          ))}
        </ul>
      </S.Result>
    );

  return (
    <S.Container>
      <h2>{questionnaire.name}</h2>
      <form onSubmit={handleSubmit}>
        {questionnaire.questions.map((q) => (
          <S.Block key={q._id}>
            <label>{q.text}</label>
            {q.type === "text" && (
              <input
                type="text"
                value={answers[q._id] || ""}
                onChange={(e) => handleChange(q._id, e.target.value)}
              />
            )}
            {q.type === "single-choice" &&
              q.options.map((opt) => (
                <div key={opt.text}>
                  <input
                    type="radio"
                    name={q._id}
                    checked={answers[q._id] === opt.text}
                    onChange={() => handleChange(q._id, opt.text)}
                  />{" "}
                  {opt.text}
                </div>
              ))}
            {q.type === "multiple-choice" &&
              q.options.map((opt) => (
                <div key={opt.text}>
                  <input
                    type="checkbox"
                    checked={(answers[q._id] || []).includes(opt.text)}
                    onChange={() => handleCheckbox(q._id, opt.text)}
                  />{" "}
                  {opt.text}
                </div>
              ))}
          </S.Block>
        ))}

        <S.SubmitBtn type="submit">Submit</S.SubmitBtn>
      </form>
    </S.Container>
  );
};

export default TakeQuiz;
