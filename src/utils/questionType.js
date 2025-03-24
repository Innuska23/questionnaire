export const convertBackendType = (type) => {
  if (type === "single-choice") return "radio";
  if (type === "multiple-choice") return "checkbox";
  return "text";
};

export const convertFrontendType = (type) => {
  if (type === "radio") return "single-choice";
  if (type === "checkbox") return "multiple-choice";
  return "text";
};
