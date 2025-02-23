import API_CONFIG from "../config/api";

// 아이템에 담긴 소리 목록 데이터 조회
export const fetchItemSounds = async (itemId: number) => {
  const token = sessionStorage.getItem("authToken");
  if (!token) throw new Error("Authentication token is missing");

  const response = await fetch(`${API_CONFIG.BACK_API}/homes/items/sound-sources?itemId=${itemId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch sound sources");
  const data = await response.json();
  const { itemName, soundSources } = data;
  return { itemName, sounds: soundSources };
};

// 소리 데이터 조회
export const fetchSoundDetail = async (soundSourceId: number) => {
  const token = sessionStorage.getItem("authToken");
  if (!token) throw new Error("Authentication token is missing");

  const response = await fetch(`${API_CONFIG.BACK_API}/homes/sound-sources?soundSourceId=${soundSourceId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch sound details");
  const data = await response.json();
  console.log("sound data", data);
  return data;
};

// 전체 음원 경로 조회
export const fetchAllSoundPath = async (pageNum: number) => {
  const token = sessionStorage.getItem("authToken");
  if (!token) throw new Error("Authentication token is missing");

  const response = await fetch(`${API_CONFIG.BACK_API}/sound-sources/path?page=${pageNum}&size=4`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch sound details");
  const data = await response.json();

  console.log(data.soundSources);
  console.log(data.pagination); // {size :5, pageNumber:1, totalPages:2,totalElements:6}

  return data;
};
