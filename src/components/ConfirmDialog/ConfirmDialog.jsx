import { createPortal } from "react-dom";
import { motion } from "framer-motion";

import { S } from "./ConfirmDialog.styles";

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message,
}) => {
  if (!open) return null;

  return createPortal(
    <S.Overlay>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <S.Dialog>
          <h3>{title}</h3>
          {message && <p>{message}</p>}
          <S.ButtonGroup>
            <S.CancelBtn onClick={onClose}>Cancel</S.CancelBtn>
            <S.ConfirmBtn onClick={onConfirm}>Yes</S.ConfirmBtn>
          </S.ButtonGroup>
        </S.Dialog>
      </motion.div>
    </S.Overlay>,
    document.body
  );
};

export default ConfirmDialog;
