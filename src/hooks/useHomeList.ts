import { useQuery } from "@tanstack/react-query";
import { fetchHomeList } from "../service/homeService";

// 홈 목록 데이터 조회
export function useHomeList() {
  return useQuery({
    queryKey: ["homeList"],
    queryFn: fetchHomeList,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
