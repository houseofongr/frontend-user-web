import { useQuery } from "@tanstack/react-query";
import { fetchHomeData } from "../service/homeService";

export function useHomeData(homeId?: number) {
  return useQuery({
    queryKey: ["homeData", homeId],
    queryFn: () => fetchHomeData(homeId!),
    enabled: !!homeId, // homeId가 존재할 때만 실행
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
