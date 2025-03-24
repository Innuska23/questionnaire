import styled from "styled-components";
import { FaSpinner } from "react-icons/fa";

export const SpinnerIcon = styled(FaSpinner)`
  animation: spin 1s linear infinite;
  color: ${(props) => props.color || "#000"};
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.5rem;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
