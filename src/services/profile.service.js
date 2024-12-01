import { userServiceRequest } from "src/config/axios.config";

// Get profile information
const getProfile = async () => {
    return await userServiceRequest.get("/profile");
}

// Update profile information
const updateProfile = async (data) => {
    return await userServiceRequest.put("/profile", data);
}

export const profileService = {
    getProfile,
    updateProfile,
}