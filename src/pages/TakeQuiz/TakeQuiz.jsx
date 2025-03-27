import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getQuestionnaireById, submitResponse } from "../../api/api";
import { S } from "./TakeQuiz.styles";

const TakeQuiz = () => {
  const { id } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [duration, setDuration] = useState(0);

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm({
    defaultValues: {},
    mode: "onChange",
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await getQuestionnaireById(id);
      setQuestionnaire(data);
      setStartTime(Date.now());

      const saved = localStorage.getItem(`quiz-${id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.keys(parsed).forEach((key) => {
          setValue(key, parsed[key]);
        });
      }
    };
    loadData();
  }, [id, setValue]);

  const onSubmit = async (formData) => {
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);

    const payload = {
      questionnaireId: id,
      completionTime: timeTaken,
      answers: questionnaire.questions.map((q) => ({
        questionId: q._id,
        answer: formData[q._id] || (q.type.includes("choice") ? [] : ""),
      })),
    };

    try {
      await submitResponse(payload);
      localStorage.removeItem(`quiz-${id}`);
      toast.success("Submission successful!");
      setSubmitted(true);
      setDuration(timeTaken);
    } catch (err) {
      toast.error("Failed to submit!");
    }
  };

  const handleSaveToLocal = (qid, value) => {
    const current = getValues();
    const updated = { ...current, [qid]: value };
    localStorage.setItem(`quiz-${id}`, JSON.stringify(updated));
    setValue(qid, value, { shouldValidate: true });
  };

  if (!questionnaire) return <p>Loading...</p>;

  if (submitted) {
    return (
      <S.Result
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2>Thank you!</h2>
        <p>You finished in {duration} seconds.</p>
        <h3>Your Answers:</h3>
        <ul>
          {questionnaire.questions.map((q) => (
            <li key={q._id}>
              <strong>{q.text}:</strong> {JSON.stringify(getValues()[q._id])}
            </li>
          ))}
        </ul>
      </S.Result>
    );
  }

  return (
    <S.Container>
      <ToastContainer />
      <h2>{questionnaire.name}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence>
          {questionnaire.questions.map((q) => (
            <motion.div
              key={q._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <S.Block>
                <label>{q.text}</label>

                <Controller
                  control={control}
                  name={q._id}
                  rules={{
                    required: q.type !== "multiple-choice",
                    validate:
                      q.type === "multiple-choice"
                        ? (val) =>
                            (Array.isArray(val) && val.length > 0) ||
                            "Select at least one"
                        : undefined,
                  }}
                  render={({ field }) => {
                    switch (q.type) {
                      case "text":
                        return (
                          <input
                            type="text"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              handleSaveToLocal(q._id, e.target.value);
                            }}
                          />
                        );

                      case "single-choice":
                        return q.options.map((opt) => (
                          <div key={opt.text}>
                            <input
                              type="radio"
                              name={q._id}
                              checked={field.value === opt.text}
                              onChange={() => {
                                field.onChange(opt.text);
                                handleSaveToLocal(q._id, opt.text);
                              }}
                            />
                            {opt.text}
                          </div>
                        ));

                      case "multiple-choice":
                        const val = Array.isArray(field.value)
                          ? field.value
                          : [];
                        const toggle = (option) => {
                          const updated = val.includes(option)
                            ? val.filter((o) => o !== option)
                            : [...val, option];
                          field.onChange(updated);
                          handleSaveToLocal(q._id, updated);
                        };
                        return q.options.map((opt) => (
                          <div key={opt.text}>
                            <input
                              type="checkbox"
                              checked={val.includes(opt.text)}
                              onChange={() => toggle(opt.text)}
                            />
                            {opt.text}
                          </div>
                        ));

                      default:
                        return null;
                    }
                  }}
                />
              </S.Block>
            </motion.div>
          ))}
        </AnimatePresence>

        <S.SubmitBtn type="submit" disabled={!isValid}>
          Submit
        </S.SubmitBtn>
      </form>
    </S.Container>
  );
};

export default TakeQuiz;
