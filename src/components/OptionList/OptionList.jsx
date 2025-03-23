import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

import { S } from "./OptionList.styles";

const OptionList = ({
  options,
  questionIndex,
  onOptionChange,
  onAddOption,
  onRemoveOption,
}) => {
  return (
    <S.OptionsWrapper>
      <S.Label>Options</S.Label>
      {options.map((opt, i) => (
        <S.OptionItem key={i}>
          <S.OptionInput
            value={opt}
            onChange={(e) => onOptionChange(questionIndex, i, e.target.value)}
            placeholder={`Option ${i + 1}`}
            required
          />
          {options.length > 2 && (
            <S.RemoveBtn
              onClick={() => onRemoveOption(i)}
              title="Remove option"
            >
              <FaTrash />
            </S.RemoveBtn>
          )}
        </S.OptionItem>
      ))}

      <S.AddBtn type="button" onClick={onAddOption}>
        <FaPlus /> Add Option
      </S.AddBtn>
    </S.OptionsWrapper>
  );
};

export default OptionList;
