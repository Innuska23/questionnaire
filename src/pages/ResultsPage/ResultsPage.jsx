import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getQuestionnaireById,
  getResponsesByQuestionnaireId,
} from "../../api/api";
import Spinner from "../../components/Spinner/Spinner";

import { S } from "./ResultsPage.styles";

const ResultsPage = () => {
  const { id } = useParams();
  const [responses, setResponses] = useState([]);
  const [questionnaire, setQuestionnaire] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res, q] = await Promise.all([
          getResponsesByQuestionnaireId(id),
          getQuestionnaireById(id),
        ]);
        setResponses(res);
        setQuestionnaire(q);
      } catch (err) {
        toast.error("Failed to load results!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <S.Container>
      <ToastContainer />
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Results: {questionnaire.name}
      </motion.h2>
      <p>Total submissions: {responses.length}</p>

      {responses.map((res, idx) => (
        <motion.div
          key={res._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: idx * 0.05 }}
        >
          <S.Card>
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
                    <strong>{q?.text || "Deleted question"}:</strong>{" "}
                    {JSON.stringify(a.answer)}
                  </li>
                );
              })}
            </ul>
          </S.Card>
        </motion.div>
      ))}
    </S.Container>
  );
};

export default ResultsPage;
