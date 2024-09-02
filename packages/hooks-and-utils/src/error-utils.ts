/* eslint-disable -- temporarily disable all lint errors */
import dictionaries from "./dictionaries/en.json";

const errors = dictionaries.errors;

export const getErrorMessage = (
  error: unknown,
  fallback?: keyof typeof errors,
): string => {
  // @ts-ignore -- ignore
  if (error.body?.message) {
    // @ts-ignore -- ignore
    return error.body.message;
  }

  // fetchBaseQuery error
  // @ts-ignore -- ignore
  if (
    error &&
    typeof error === "object" &&
    !error?.message &&
    !error?.data &&
    "status" in error
  ) {
    console.log("fetchBaseQuery");
    return errors["default-fetch"];
  }
  // @ts-ignore -- ignore
  if (error.data) {
    // @ts-ignore -- ignore
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

  // @ts-ignore -- ignore
  if (error.message && typeof error.message === "string") {
    // @ts-ignore -- ignore
    return error.message;
  }
  console.log("error", error);

  return (
    errors[error as keyof typeof errors] ?? errors[fallback ?? "default-fetch"]
  );
};
