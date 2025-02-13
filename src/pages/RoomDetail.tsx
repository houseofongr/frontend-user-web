import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_CONFIG from "../config/api";
import { BaseRoom } from "../types/home";
import SpinnerIcon from "../components/icons/SpinnerIcon";
import RoomDetailLayout from "../components/layout/RoomDetailLayout";
import KonvaContainer from "../components/KonvaContainer";

export default function RoomDetailPage() {
  const { homeId, roomId } = useParams<{ homeId: string; roomId: string }>();

  const [roomData, setRoomData] = useState<BaseRoom | null>(null);

  const [imageSize, setImageSize] = useState({ width: 0, height: 0, scale: 1, scaleAxis: "" });
  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null);

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
        console.log("???", data);
        setRoomData(data.room);
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
        scale: scale,
        scaleAxis: scaleAxis,
      });
      setBackgroundImage(image);
    };
  }, [roomData]);

  if (!roomData) return <SpinnerIcon />;
  return (
    <RoomDetailLayout>
      <p className="absolute  left-0 p-2 bg-amber-300 z-1">
        ID#{roomId} | {roomData.name}
      </p>

      <KonvaContainer backgroundImage={backgroundImage} imageSize={imageSize} />
    </RoomDetailLayout>
  );
}
