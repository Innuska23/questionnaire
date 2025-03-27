import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import QuestionnaireCard from "../../components/QuestionnaireCard/QuestionnaireCard";
import Pagination from "../../components/Pagination/Pagination";
import Spinner from "../../components/Spinner/Spinner";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { useQuestionnaires } from "../../hooks/useQuestionnaires";

import { S } from "./Catalog.styles";

const Catalog = () => {
  const navigate = useNavigate();
  const {
    questionnaires,
    loading,
    error,
    sortBy,
    currentPage,
    totalPages,
    setCurrentPage,
    handleDelete,
    handleSortChange,
  } = useQuestionnaires();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleCreateNew = () => {
    navigate("/create");
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await handleDelete(selectedId);
      toast.success("Questionnaire deleted!");
    } catch (err) {
      toast.error("Failed to delete questionnaire");
    } finally {
      setConfirmOpen(false);
    }
  };

  return (
    <S.Wrapper>
      <ToastContainer />
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete questionnaire?"
        message="This action cannot be undone."
      />

      <S.Header>
        <h1>Catalog</h1>
        <div>
          <S.SortSelect
            onChange={(e) => handleSortChange(e.target.value)}
            value={sortBy}
          >
            <option value="createdAt">Newest</option>
            <option value="name">Name</option>
            <option value="questions">Questions</option>
            <option value="completions">Completions</option>
          </S.SortSelect>
          <S.Button onClick={handleCreateNew}>Create New</S.Button>
        </div>
      </S.Header>

      {loading ? (
        <Spinner size={32} />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : questionnaires.length === 0 ? (
        <S.EmptyState>
          <p>No questionnaires found. Create your first one!</p>
          <S.Button onClick={handleCreateNew}>Create Questionnaire</S.Button>
        </S.EmptyState>
      ) : (
        <>
          <S.Grid>
            <AnimatePresence>
              {questionnaires.map((q) => (
                <motion.div
                  key={q._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <QuestionnaireCard
                    data={q}
                    onDelete={() => handleDeleteClick(q._id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </S.Grid>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </S.Wrapper>
  );
};

export default Catalog;
