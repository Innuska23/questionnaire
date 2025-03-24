import { FaSpinner } from "react-icons/fa";

import { SpinnerContainer } from "./Spinner.styles";

const Spinner = ({ size = 24 }) => {
  return (
    <SpinnerContainer>
      <FaSpinner size={size} />
    </SpinnerContainer>
  );
};

export default Spinner;
