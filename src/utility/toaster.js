// src/utils/toastHelpers.js
import toast from "react-hot-toast";

// Define the options for your toast notifications (optional)
const defaultToastOptions = {
  duration: 4000,
  position: "top-right",
};

// Success notification
const success = (message) => {
  toast.success(message, defaultToastOptions);
};

// Error notification
const error = (message) => {
  toast.error(message, defaultToastOptions);
};

// Info notification
const info = (message) => {
  toast(message, {
    ...defaultToastOptions,
    icon: "ℹ️",
  });
};

// Warning notification
const warning = (message) => {
  toast(message, {
    ...defaultToastOptions,
    icon: "⚠️",
    style: { background: "orange", color: "white" },
  });
};

// Customizable toast with custom icon and options
const custom = (message, icon, options) => {
  toast(message, {
    ...defaultToastOptions,
    ...options,
    icon: icon || "🔔",
  });
};

export const toaster = {
  success,
  error,
  info,
  warning,
  custom,
};
