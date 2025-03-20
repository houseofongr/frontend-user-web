import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../stores/useUserStore";
import { User } from "../types/user";
import { deleteUser, fetchUser, logoutUser, updateUserProfile } from "../service/userService";

// 유저 데이터 조회 훅
export function useUserData() {
  const { setUser } = useUserStore();
  const { data, isLoading, isError } = useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);
  return { isLoading, isError };
}

// 유저 정보 업데이트 훅 - 마이페이지/나의 계정에서 사용
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
}

//유저 로그아웃 훅
export function useLogout() {
  const { clearUser } = useUserStore();
  return () => {
    logoutUser();
    clearUser();
  };
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { clearUser } = useUserStore();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      clearUser();
      logoutUser();
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
}
