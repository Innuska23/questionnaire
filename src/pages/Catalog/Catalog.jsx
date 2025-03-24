import React from "react";
import { useNavigate } from "react-router-dom";

import QuestionnaireCard from "../../components/QuestionnaireCard/QuestionnaireCard";
import Pagination from "../../components/Pagination/Pagination";
import Spinner from "../../components/Spinner/Spinner";
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

  const handleCreateNew = () => {
    navigate("/create");
  };

  if (error) {
    return (
      <S.Wrapper>
        <S.Header>
          <h1>Catalog</h1>
        </S.Header>
        <div className="error-message">{error}</div>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
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
      ) : (
        <>
          {questionnaires.length === 0 ? (
            <S.EmptyState>
              <p>No questionnaires found. Create your first one!</p>
              <S.Button onClick={handleCreateNew}>
                Create Questionnaire
              </S.Button>
            </S.EmptyState>
          ) : (
            <S.Grid>
              {questionnaires.map((q) => (
                <QuestionnaireCard
                  key={q._id}
                  data={q}
                  onDelete={handleDelete}
                />
              ))}
            </S.Grid>
          )}

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
