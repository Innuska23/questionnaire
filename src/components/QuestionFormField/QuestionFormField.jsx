import { S } from "./QuestionForm.styles";

const QuestionFormField = ({
  type = "text",
  label,
  value,
  onChange,
  placeholder = "",
  required = false,
  options = [],
  name,
}) => {
  return (
    <S.FormGroup>
      <S.Label>{label}</S.Label>

      {type === "text" && (
        <S.TextInput
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          name={name}
        />
      )}

      {type === "textarea" && (
        <S.TextArea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          name={name}
        />
      )}

      {type === "select" && (
        <S.Select
          value={value}
          onChange={onChange}
          required={required}
          name={name}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </S.Select>
      )}
    </S.FormGroup>
  );
};

export default QuestionFormField;
