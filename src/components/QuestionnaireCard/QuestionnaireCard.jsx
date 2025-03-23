import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaEdit, FaTrash } from "react-icons/fa";

import { S } from "./QuestionnaireCard.styles";

const QuestionnaireCard = ({ data, onDelete }) => {
  const navigate = useNavigate();

  return (
    <S.Card>
      <S.Title>{data.name}</S.Title>
      <S.Description>{data.description}</S.Description>
      <S.Meta>
        <span>{data.questions.length} questions</span>
        <span>{data.completions} completions</span>
      </S.Meta>
      <S.Actions>
        <S.IconBtn onClick={() => navigate(`/take/${data._id}`)} title="Take">
          <FaPlay />
        </S.IconBtn>
        <S.IconBtn onClick={() => navigate(`/edit/${data._id}`)} title="Edit">
          <FaEdit />
        </S.IconBtn>
        <S.IconBtn onClick={() => onDelete(data._id)} title="Delete">
          <FaTrash />
        </S.IconBtn>
      </S.Actions>
    </S.Card>
  );
};

export default QuestionnaireCard;
