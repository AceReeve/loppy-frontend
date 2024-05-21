import dictionaries from "../dictionaries/en.json";

const errors = dictionaries.errors;

export const getErrorMessage = (
  error: string,
  fallback?: keyof typeof errors,
) => {
  return (
    errors[error as keyof typeof errors] ?? errors[fallback ?? "default-fetch"]
  );
};
