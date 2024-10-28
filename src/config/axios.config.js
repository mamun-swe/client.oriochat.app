import axios from "axios";

const apiUrl = import.meta.env.VITE_API_ENDPOINT || "";

/* Common request config */
axios.defaults.headers.post["Content-Type"] = "application/json";

/** Public request instance */
const publicRequest = axios.create({
  baseURL: apiUrl,
});

/* Public request interceptor */
publicRequest.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { publicRequest };
