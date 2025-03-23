import React, { useEffect, useState } from "react";

import { deleteQuestionnaire, getQuestionnaires } from "../../api/api";
import QuestionnaireCard from "../../components/QuestionnaireCard/QuestionnaireCard";

import { S } from "./Catalog.styles";
import Pagination from "../../components/Pagination/Pagination";

const Catalog = () => {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  const fetchData = async () => {
    try {
      const data = await getQuestionnaires({ page: currentPage, sortBy });
      setQuestionnaires(data.questionnaires);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this questionnaire?")) {
      await deleteQuestionnaire(id);
      fetchData();
    }
  };

  return (
    <S.Wrapper>
      <S.Header>
        <h1>Catalog</h1>
        <S.SortSelect
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
        >
          <option value="name">Name</option>
          <option value="questions">Questions</option>
          <option value="completions">Completions</option>
        </S.SortSelect>
      </S.Header>
      <S.Grid>
        {questionnaires.map((q) => (
          <QuestionnaireCard key={q._id} data={q} onDelete={handleDelete} />
        ))}
      </S.Grid>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </S.Wrapper>
  );
};

export default Catalog;
