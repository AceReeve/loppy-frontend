import dictionaries from "../dictionaries/en.json";

const errors = dictionaries.errors;

export const getErrorMessage = (
  error: string | object,
  fallback?: keyof typeof errors,
) => {
  // fetchBaseQuery error
  if (typeof error === "object" && !error?.data && "status" in error) {
    console.log("fetchBaseQuery");
    return errors["default-fetch"];
  }

  if (error.data) {
    const errorMessage = error.data.errors || error.data.message;

    // Error with message
    if (typeof errorMessage === "string") {
      return errorMessage;
    }
    if (Array.isArray(errorMessage)) {
      // If it's an array, it could either be an array of messages or objects
      return errorMessage.reduce((acc, error) => {
        if (typeof error === "string") {
          acc.push(error);
        } else if (typeof error === "object") {
          // Handle object errors, extracting nested messages
          Object.values(error).forEach((val) => {
            if (Array.isArray(val)) acc.push(...val);
          });
        }
        return acc;
      }, []);
    }
  }

  return (
    errors[error as keyof typeof errors] ?? errors[fallback ?? "default-fetch"]
  );
};
