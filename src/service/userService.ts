import API_CONFIG from "../config/api";

export const fetchUser = async () => {
  const token = sessionStorage.getItem("authToken");
  if (!token) throw new Error("Authentication token is missing");

  const response = await fetch(`${API_CONFIG.BACK_API}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch user info");
  return response.json();
};

// 닉네임 변경
export async function updateUserProfile(updatedUserData: { nickname: string }) {
  const token = sessionStorage.getItem("authToken");
  if (!token) throw new Error("Authentication token is missing");

  const response = await fetch(`${API_CONFIG.BACK_API}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedUserData),
  });

  if (!response.ok) throw new Error("Failed to update user profile");
  return response.json();
}

// src/service/userService.ts

export async function deleteUser(agreement: {
  termsOfDeletionAgreement: boolean;
  personalInformationDeletionAgreement: boolean;
}) {
  const token = sessionStorage.getItem("authToken");
  if (!token) throw new Error("Authentication token is missing");

  const response = await fetch(`${API_CONFIG.BACK_API}/users`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(agreement),
  });

  if (!response.ok) throw new Error("Failed to delete user account");
  return response.json();
}

// 유저 로그아웃 (토큰 삭제)
export function logoutUser() {
  sessionStorage.removeItem("authToken");
}
