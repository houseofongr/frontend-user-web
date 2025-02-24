import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchHomeData, setupMainhome, setupHomeName } from "../service/homeService";

export function useHomeData(homeId: number | null) {
  const queryClient = useQueryClient();

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["homeData", homeId],
    queryFn: () => fetchHomeData(homeId!),
    enabled: !!homeId,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  //메인 홈 설정
  const {
    mutate: updateMainHome,
    isPending,
    error: updateError,
  } = useMutation({
    mutationFn: setupMainhome,
    onSuccess: (_, newHomeId) => {
      queryClient.invalidateQueries({ queryKey: ["homeData", newHomeId] });
      queryClient.invalidateQueries({ queryKey: ["homeList"] });
    },
    onError: (error) => {
      console.error("메인 홈 설정 실패:", error);
    },
  });

  // 홈 이름 변경
  const {
    mutate: updateHomeName,
    isPending: isUpdatingName,
    error: updateNameError,
  } = useMutation({
    mutationFn: ({ homeId, newName }: { homeId: number; newName: string }) => setupHomeName(homeId, newName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homeData", homeId] });
      queryClient.invalidateQueries({ queryKey: ["homeList"] });
    },
    onError: (error) => {
      console.error("홈 이름 변경 실패", error);
    },
  });

  return {
    homeData: data ?? null,
    isLoading,
    isFetching,
    error,
    updateMainHome,
    isPending,
    updateError,
    updateHomeName,
    isUpdatingName,
    updateNameError,
  };
}
