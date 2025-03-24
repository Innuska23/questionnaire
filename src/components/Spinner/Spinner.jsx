import { S } from "./Spinner.styles";

const Spinner = ({ size = 14, color = "#4a90e2", className = "" }) => {
  return (
    <S.SpinnerWrapper className={className}>
      <S.SpinnerIcon size={size} color={color} className={className} />
    </S.SpinnerWrapper>
  );
};

export default Spinner;
