import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getQuestionnaires = async ({ page = 1, limit = 10, sortBy }) => {
  const res = await api.get("/api/questionnaires", {
    params: { page, limit, sortBy },
  });
  return res.data;
};

export const getQuestionnaireById = async (id) => {
  const res = await api.get(`/api/questionnaires/${id}`);
  return res.data;
};

export const createQuestionnaire = async (data) => {
  const res = await api.post("/api/questionnaires", data);
  return res.data;
};

export const updateQuestionnaire = async (id, data) => {
  const res = await api.put(`/api/questionnaires/${id}`, data);
  return res.data;
};

export const deleteQuestionnaire = async (id) => {
  const res = await api.delete(`/api/questionnaires/${id}`);
  return res.data;
};

export const submitResponse = async (data) => {
  const res = await api.post("/api/responses", data);
  return res.data;
};

export const getResponsesByQuestionnaireId = async (questionnaireId) => {
  const res = await api.get(`/api/responses/questionnaire/${questionnaireId}`);
  return res.data;
};
