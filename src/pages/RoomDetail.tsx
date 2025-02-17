import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_CONFIG from "../config/api";
import { BaseRoom } from "../types/home";
import SpinnerIcon from "../components/icons/SpinnerIcon";
import RoomDetailLayout from "../components/layout/RoomDetailLayout";
import KonvaContainer from "../components/KonvaContainer";
import { ShapeData } from "../types/items";
import formatShapeDataForView from "../utils/formatShapeDataForView";
import SoundItem from "../components/SoundItem";

export default function RoomDetailPage() {
  const { homeId, roomId } = useParams<{ homeId: string; roomId: string }>();
  const [roomData, setRoomData] = useState<BaseRoom | null>(null);
  const [shapes, setShapes] = useState<ShapeData[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [soundSources, setSoundSources] = useState<any[]>([]);
  const [isLoadingSounds, setIsLoadingSounds] = useState(false);

  const [imageSize, setImageSize] = useState({ width: 0, height: 0, scale: 1, scaleAxis: "" });
  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null);

  const fetchSoundSources = async (itemId: number) => {
    try {
      setIsLoadingSounds(true);
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authentication token is missing");

      const response = await fetch(`${API_CONFIG.BACK_API}/homes/items/sound-sources?itemId=${itemId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch sound sources");
      }

      const data = await response.json();
      console.log("sound list", data);
      setSoundSources(data.soundSources);
    } catch (error) {
      console.error("Error fetching sound sources:", error);
      setSoundSources([]);
    } finally {
      setIsLoadingSounds(false);
    }
  };

  const handleItemClick = (itemId: number) => {
    setSelectedItemId(itemId);
    fetchSoundSources(itemId);
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

      // const offsetX = (window.innerWidth - imgWidth * scale) / 2;
      // const offsetY = (window.innerHeight - imgHeight * scale) / 2;

      setImageSize({
        width: imgWidth,
        height: imgHeight,
        scale: scale,
        scaleAxis: scaleAxis,
      });
      setBackgroundImage(image);

      // 상대 좌표 -> 절대 좌표 변환
      const transformedShapes = shapes.map((shape) =>
        formatShapeDataForView(shape, { width: imgWidth, height: imgHeight, scale })
      );
      setShapes(transformedShapes);
    };
  }, [roomData]);

  if (!roomData) return <SpinnerIcon />;
  return (
    <RoomDetailLayout>
      {/* <p className="absolute  left-0 p-2 bg-amber-300 z-1">
        ID#{roomId} | {roomData.name}
      </p> */}
      <KonvaContainer
        backgroundImage={backgroundImage}
        imageSize={imageSize}
        shapes={shapes}
        onItemClick={handleItemClick}
      />
      {selectedItemId && (
        <div className="absolute top-0 right-0 bg-black/20 p-4 border min-w-[300px]">
          {isLoadingSounds ? (
            <p>로딩 중...</p>
          ) : (
            <ul>
              {soundSources.map((sound) => (
                <SoundItem sound={sound} />
              ))}
            </ul>
          )}

          <button className="mt-4 px-4 py-2" onClick={() => setSelectedItemId(null)}>
            닫기
          </button>
        </div>
      )}
    </RoomDetailLayout>
  );
}
