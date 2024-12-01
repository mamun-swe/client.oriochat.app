import toast from "react-hot-toast";

/** Success toast message */
const Success = ({ message }) => {
  toast.success(message);
};

/** Error toast message */
const Error = ({ message }) => {
  toast.error(message);
};

export const HotToast = {
  Success,
  Error,
};
