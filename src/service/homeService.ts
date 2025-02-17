import API_CONFIG from "../config/api";

// 유저의 홈 목록 조회
export const fetchHomeList = async () => {
  const token = sessionStorage.getItem("authToken");
  if (!token) throw new Error("Authentication token is missing");

  const response = await fetch(`${API_CONFIG.BACK_API}/homes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch user home list data");
  const data = await response.json();
  return data.homes;
};

// 유저의 홈 상세 조회
export const fetchHomeData = async (homeId: number) => {
  const token = sessionStorage.getItem("authToken");

  if (!token) throw new Error("Authentication token is missing");

  const response = await fetch(`${API_CONFIG.BACK_API}/homes/rooms?homeId=${homeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch user home detail data");
  const data = await response.json();
  return data;
};
