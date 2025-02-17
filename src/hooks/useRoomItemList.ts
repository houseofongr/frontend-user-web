import { useQuery } from "@tanstack/react-query";
import { fetchRoomItems } from "../service/roomService";
import { BaseRoom } from "../types/home";
import { ShapeData } from "../types/items";

export function useRoomItemList(homeId?: string, roomId?: string) {
  const { data, error, isLoading, isFetching } = useQuery<{
    room: BaseRoom;
    items: ShapeData[];
  }>({
    queryKey: ["roomItems", homeId, roomId],
    queryFn: () => fetchRoomItems(homeId!, roomId!),
    enabled: !!homeId && !!roomId,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    roomData: data?.room ?? null,
    shapes: data?.items ?? [],
    error,
    isLoading,
    isFetching,
  };
}
