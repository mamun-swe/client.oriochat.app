import { toaster } from "src/utility/toaster";

/* Global network error handler */
export const networkErrorHandler = (error) => {
  const errors = error?.response?.data?.errors;

  if (errors) {
    Object.values(errors).forEach((messages) => {
      if (messages && messages.length) {
        toaster.error(messages[0]);
      }
    });
  } else {
    toaster.error("Something went wrong. Please try again.");
  }
};
