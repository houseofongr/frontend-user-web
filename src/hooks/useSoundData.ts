import { useQuery } from "@tanstack/react-query";
import { fetchSoundDetail } from "../service/soundService";

export function useSoundDetail(selectedSoundId: number | null) {
  return useQuery({
    queryKey: ["soundDetail", selectedSoundId],
    queryFn: () => fetchSoundDetail(selectedSoundId!),

    enabled: !!selectedSoundId,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
