import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShapeData } from "../../types/items";
import { fetchItemSounds } from "../../service/soundService";
import { ItemSoundsData } from "../../types/sound";
import API_CONFIG from "../../config/api";
import SpinnerIcon from "../../components/icons/SpinnerIcon";
import RoomDetailLayout from "../../components/layout/RoomDetailLayout";
import KonvaContainer from "../../components/KonvaContainer";
import formatShapeDataForView from "../../utils/formatShapeDataForView";
import ItemSoundList from "../../components/ItemSoundList";
import { BaseRoom } from "../../types/home";

export default function RoomDetailPage() {
  const { homeId, roomId } = useParams<{ homeId: string; roomId: string }>();
  const [roomData, setRoomData] = useState<BaseRoom | null>(null);
  const [shapes, setShapes] = useState<ShapeData[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [itemSounds, setItemSounds] = useState<ItemSoundsData>({ itemName: "", sounds: [] });

  const [imageSize, setImageSize] = useState({ width: 0, height: 0, scale: 1, scaleAxis: "" });
  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null);

  const getItemSounds = useCallback(async (itemId: number) => {
    const data = await fetchItemSounds(itemId);
    setItemSounds(data);
  }, []);

  const handleItemClick = (itemId: number) => {
    setSelectedItemId(itemId);
    getItemSounds(itemId);
  };

  useEffect(() => {
    if (!homeId || !roomId) return;

    const fetchRoomData = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) throw new Error("Authentication token is missing");

        const response = await fetch(`${API_CONFIG.BACK_API}/homes/rooms/items?homeId=${homeId}&roomId=${roomId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch room data");
        }
        const data = await response.json();
        setRoomData(data.room);
        setShapes(data.items);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRoomData();
  }, [homeId, roomId]);

  useEffect(() => {
    if (!roomData) return;
    const image = new window.Image();
    image.src = `${API_CONFIG.PRIVATE_IMAGE_LOAD_API}/${roomData.imageId}`;

    image.onload = () => {
      const stageWidth = window.innerWidth;
      const stageHeight = window.innerHeight;

      const imgWidth = image.width;
      const imgHeight = image.height;

      const scaleX = stageWidth / imgWidth;
      const scaleY = stageHeight / imgHeight;

      const scale = Math.min(scaleX, scaleY);
      const scaleAxis = scaleX > scaleY ? "Y" : "X";

      setImageSize({
        width: imgWidth,
        height: imgHeight,
        scale,
        scaleAxis,
      });
      setBackgroundImage(image);

      // 상대 좌표 -> 절대 좌표 변환
      const transformedShapes = shapes.map((shape) =>
        formatShapeDataForView(shape, { width: imgWidth, height: imgHeight, scale })
      );
      setShapes(transformedShapes);
    };
  }, [roomData]);

  useEffect(() => {
    if (!selectedItemId) {
      setItemSounds({ itemName: "", sounds: [] });
    }
  }, [selectedItemId]);

  if (!roomData) return <SpinnerIcon />;
  return (
    <RoomDetailLayout>
      <KonvaContainer
        backgroundImage={backgroundImage}
        imageSize={imageSize}
        shapes={shapes}
        onItemClick={handleItemClick}
      />
      {selectedItemId && itemSounds && <ItemSoundList itemSounds={itemSounds} />}
    </RoomDetailLayout>
  );
}
