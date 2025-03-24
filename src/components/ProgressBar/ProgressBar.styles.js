import styled from "styled-components";

const BarContainer = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin: 10px 0;
`;

const BarFill = styled.div`
  height: 10px;
  background-color: #4caf50;
  border-radius: 4px;
  width: ${(props) => props.percent}%;
  transition: width 0.3s ease;
`;

export const S = {
  BarContainer,
  BarFill,
};
