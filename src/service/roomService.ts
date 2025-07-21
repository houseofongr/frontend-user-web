import API_CONFIG from "../config/api";
import { BaseRoom } from "../types/home";
import { ShapeData } from "../types/items";

export const fetchRoomItems = async (
  homeId: string,
  roomId: string
): Promise<{ room: BaseRoom; items: ShapeData[] }> => {
  const token = sessionStorage.getItem("authToken");
  if (!token) throw new Error("Authentication token is missing");

  const response = await fetch(`${API_CONFIG.BACK_ADMIN_API}/homes/rooms/items?homeId=${homeId}&roomId=${roomId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch room data");
  }

  return response.json();
};
