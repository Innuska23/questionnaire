import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Dialog = styled.div`
  background: white;
  padding: 24px;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  min-width: 400px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  text-align: center;

  h3 {
    margin: 0 0 10px;
  }

  p {
    margin: 0 0 20px;
    color: #555;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const CancelBtn = styled.button`
  padding: 8px 16px;
  border: 1px solid #bbb;
  border-radius: 8px;
  background: white;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
`;

const ConfirmBtn = styled.button`
  padding: 8px 16px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #c0392b;
  }
`;

export const S = {
    Overlay,
    Dialog,
    ButtonGroup,
    CancelBtn,
    ConfirmBtn
}