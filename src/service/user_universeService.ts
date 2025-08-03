import API_CONFIG from "../config/api";

export enum SearchType {
  ALL = "전체 검색",
  CONTENT = "제목 + 내용 검색",
  AUTHOR = "작성자 검색",
}

// 공개 유니버스 검색 API
export const public_getUniverse = async (
  page: number,
  sizeValue: number,
) => {
  const query = new URLSearchParams({
    page: page.toString(),
    size: sizeValue.toString(),
  });

  const response = await fetch(
    `${API_CONFIG.BACK_USER_API}/universes?${query.toString()}`
  );

  if (!response.ok) throw new Error("Failed to fetch universe.");

  return response.json();
};

// 관리자 유니버스 상세정보 조회 API
export const public_getUniverseDetail = async (universeId: number) => {
  const response = await fetch(
    `${API_CONFIG.BACK_USER_API}/universes/${universeId}`
  );
  if (!response.ok) throw new Error("Failed to fetch universe.");

  return response.json();
};

// 랜덤 유니버스 추천 API
export const public_getUniverseRandom = async (exceptIds: number[]) => {
  const response = await fetch(
    `${API_CONFIG.BACK_USER_API}/universes/random?exceptIds=${exceptIds.join(
      ","
    )}`
  );
  if (!response.ok) throw new Error("Failed to fetch universe.");

  return response.json();
};
