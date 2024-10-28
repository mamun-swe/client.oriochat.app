// src/services/room.service.js
import { publicRequest } from "src/config/axios.config";

// Get list of rooms
const getRooms = async () => {
  return await publicRequest.get("/api/v1/rooms");
};

// Create a new room
const createRoom = async (data) => {
  return await publicRequest.post("/api/v1/rooms", data);
};

// Get specific room
const getRoom = async (id) => {
  return await publicRequest.get(`/api/v1/rooms/${id}`);
};

export const roomService = {
  getRooms,
  createRoom,
  getRoom,
};
