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

// Function to format date and time
export const formatDateTime = (date) => {
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return new Date(date).toLocaleString("en-US", options);
};

// Get icon name
export const getIconName = (name) => {
  const str = name.split(" ");
  const firstLetter = str[0][0].toUpperCase();
  const lastLetter = str[str.length - 1][0].toUpperCase();

  return firstLetter + lastLetter;
};

// get token from local storage
export const getToken = () => {
  return localStorage.getItem("token");
};
