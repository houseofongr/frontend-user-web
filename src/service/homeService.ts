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
  // console.log("data", data.homes);

  // const testResult = [
  //   { id: 72, basicImageId: 166, name: "#윤선영의 메인홈", isMain: true },
  //   // { id: 105, basicImageId: 169, name: "주잔돌이 그려준 윤선영의 집", isMain: false },
  // ];
  // return testResult;
  return data.homes;
  // return []; // 보유한 홈 없을 경우 테스트
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

// 유저의 메인 홈 설정(수정)
export const setupMainhome = async (homeId: number) => {
  const token = sessionStorage.getItem("authToken");
  if (!token) throw new Error("Authentication token is missing");

  const response = await fetch(`${API_CONFIG.BACK_API}/homes/${homeId}/main`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch user home detail data");
  const data = await response.json();
  return data;
};

//유저의 메인 홈 네임 설정(수정)
export const setupHomeName = async (homeId: number, newName: string) => {
  const token = sessionStorage.getItem("authToken");

  if (!token) throw new Error("Authentication token is missing");

  const response = await fetch(`${API_CONFIG.BACK_API}/homes/${homeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ newName }),
  });
  if (!response.ok) throw new Error("Failed to fetch user home detail data");

  //  response
  // {
  //   "message" : "1번 홈의 이름이 수정되었습니다."
  // }
};
