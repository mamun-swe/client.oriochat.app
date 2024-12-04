import axios from "axios";
import { getToken } from "src/utility/helper";

const userServiceAPIURL = import.meta.env.VITE_USER_SERVICE_API_ENDPOINT || "";
const chatServiceAPIURL = import.meta.env.VITE_CHAT_SERVICE_API_ENDPOINT || "";

/* Common request config */
axios.defaults.headers.post["Content-Type"] = "application/json";

/** User service request instance */
const userServiceRequest = axios.create({
  baseURL: userServiceAPIURL,
});

/** Chat service request instance */
const chatServiceRequest = axios.create({
  baseURL: chatServiceAPIURL,
});

/* User service request interceptor */
userServiceRequest.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* Chat service request interceptor */
chatServiceRequest.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { userServiceRequest, chatServiceRequest };
