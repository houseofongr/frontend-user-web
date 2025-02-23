import { useQuery } from "@tanstack/react-query";
import { fetchAllSoundPath, fetchSoundDetail } from "../service/soundService";

export function useSoundDetail(selectedSoundId: number | null) {
  return useQuery({
    queryKey: ["soundDetail", selectedSoundId],
    queryFn: () => fetchSoundDetail(selectedSoundId!),

    enabled: !!selectedSoundId,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function useAllSound(pageNum: number | null) {
  return useQuery({
    queryKey: ["allSoundPath", pageNum],
    queryFn: () => fetchAllSoundPath(pageNum!),

    enabled: !!pageNum,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
