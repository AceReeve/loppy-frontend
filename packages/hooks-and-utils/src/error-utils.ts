import dictionaries from "../dictionaries/en.json";

const errors = dictionaries.errors;

export const getErrorMessage = (
  error: string | object,
  fallback?: keyof typeof errors,
) => {
  // fetchBaseQuery error
  if (typeof error === "object" && error != null && "status" in error) {
    return errors["default-fetch"];
  }
  // Error with message
  if (
    typeof error === "object" &&
    error != null &&
    "message" in error &&
    typeof (error as any).message === "string"
  ) {
    return error.message;
  }
  return (
    errors[error as keyof typeof errors] ?? errors[fallback ?? "default-fetch"]
  );
};
