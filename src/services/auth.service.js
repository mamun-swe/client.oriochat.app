import { userServiceRequest } from "src/config/axios.config";

// Sign in user
const signIn = async ({ email, password }) => {
  return await userServiceRequest.post("/login", {
    email,
    password,
  });
};

// Sign up user
const signUp = async ({ name, email, password }) => {
  return await userServiceRequest.post("/register", {
    name,
    email,
    password,
  });
};

export const authService = {
  signIn,
  signUp,
};
