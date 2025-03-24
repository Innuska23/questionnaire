import styled from "styled-components";
import { FaSpinner } from "react-icons/fa";

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const SpinnerIcon = styled(FaSpinner)`
  animation: spin 1s linear infinite;
  color: ${(props) => props.color || "var(--primary-color)"};
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

export const S = {
  SpinnerWrapper,
  SpinnerIcon,
};
