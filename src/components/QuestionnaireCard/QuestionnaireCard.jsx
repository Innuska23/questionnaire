import { useNavigate } from "react-router-dom";
import { FaPlay, FaEdit, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

import { S } from "./QuestionnaireCard.styles";

const QuestionnaireCard = ({ data, onDelete }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <S.Card>
        <S.Title>{data.name}</S.Title>
        <S.Description>{data.description}</S.Description>
        <S.Meta>
          <span>{data.questions.length} questions</span>
          <span>{data.completions} completions</span>
        </S.Meta>
        <S.Actions>
          <S.IconBtn
            color="blue"
            onClick={() => navigate(`/take/${data._id}`)}
            title="Take"
          >
            <FaPlay />
          </S.IconBtn>
          <S.IconBtn
            color="green"
            onClick={() => navigate(`/edit/${data._id}`)}
            title="Edit"
          >
            <FaEdit />
          </S.IconBtn>
          <S.IconBtn
            color="red"
            onClick={() => onDelete(data._id)}
            title="Delete"
          >
            <FaTrash />
          </S.IconBtn>
        </S.Actions>
      </S.Card>
    </motion.div>
  );
};

export default QuestionnaireCard;
