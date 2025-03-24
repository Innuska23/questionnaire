import { useState, useEffect, useCallback } from "react";

import { getQuestionnaires, deleteQuestionnaire } from "../api/api";

export const useQuestionnaires = (
  initialSortBy = "createdAt",
  initialPage = 1,
  limit = 6
) => {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [sortBy, setSortBy] = useState(() => {
    return localStorage.getItem("sortBy") || initialSortBy;
  });
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? Number(savedPage) : initialPage;
  });
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem("sortBy", sortBy);
  }, [sortBy]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getQuestionnaires(currentPage, limit, sortBy);
      setQuestionnaires(data.questionnaires);
      setTotalPages(data.totalPages);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch questionnaires");
    } finally {
      setLoading(false);
    }
  }, [sortBy, currentPage, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this questionnaire?")) {
      try {
        setLoading(true);
        await deleteQuestionnaire(id);
        await fetchData();
      } catch (err) {
        setError(err.message || "Failed to delete questionnaire");
        setLoading(false);
      }
    }
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  return {
    questionnaires,
    loading,
    error,
    sortBy,
    currentPage,
    totalPages,
    setCurrentPage,
    handleDelete,
    handleSortChange,
    refreshData: fetchData,
  };
};
