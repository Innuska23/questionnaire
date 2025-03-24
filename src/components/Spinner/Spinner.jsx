import { FaSpinner } from "react-icons/fa";
import { SpinnerIcon } from "./Spinner.styles";

const Spinner = ({ size = 14, color = "#fff", className = "" }) => {
  return <SpinnerIcon size={size} color={color} className={className} />;
};

export default Spinner;
