import React from "react";

import { S } from "./ProgressBar.styles";

const ProgressBar = ({ percent = 0 }) => {
  return (
    <S.BarContainer>
      <S.BarFill percent={Math.min(100, Math.max(0, percent))} />
    </S.BarContainer>
  );
};

export default ProgressBar;
