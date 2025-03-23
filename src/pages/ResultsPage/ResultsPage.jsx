import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { S } from "./ResultsPage.styles";
import {
  getQuestionnaireById,
  getResponsesByQuestionnaireId,
} from "../../api/api";

const ResultsPage = () => {
  const { id } = useParams();
  const [responses, setResponses] = useState([]);
  const [questionnaire, setQuestionnaire] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [res, q] = await Promise.all([
        getResponsesByQuestionnaireId(id),
        getQuestionnaireById(id),
      ]);
      setResponses(res);
      setQuestionnaire(q);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) return <S.Center>Loading...</S.Center>;

  return (
    <S.Container>
      <h2>Results: {questionnaire.name}</h2>
      <p>Total submissions: {responses.length}</p>

      {responses.map((res, idx) => (
        <S.Card key={res._id}>
          <h4>Response #{idx + 1}</h4>
          <p>
            <strong>Time:</strong> {res.completionTime} sec
          </p>
          <ul>
            {res.answers.map((a, i) => {
              const q = questionnaire.questions.find(
                (q) => q._id === a.questionId
              );
              return (
                <li key={i}>
                  <strong>{q?.text || "Deleted question"}</strong>:{" "}
                  {JSON.stringify(a.answer)}
                </li>
              );
            })}
          </ul>
        </S.Card>
      ))}
    </S.Container>
  );
};

export default ResultsPage;
