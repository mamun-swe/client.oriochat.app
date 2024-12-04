import { chatServiceRequest } from "src/config/axios.config";

// Get list of rooms
const getRooms = async () => {
  return await chatServiceRequest.get("/api/v1/rooms");
};

// Create a new room
const createRoom = async (data) => {
  return await chatServiceRequest.post("/api/v1/rooms", data);
};

// Get specific room
const getRoom = async (roomId) => {
  return await chatServiceRequest.get(`/api/v1/rooms/${roomId}`);
};

export const roomService = {
  getRooms,
  createRoom,
  getRoom,
};
