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
import { BaseRoom } from "../../types/home";
import { BiSolidPlaylist } from "react-icons/bi";
import ItemSoundList from "../../components/ItemSoundList";

export default function RoomDetailPage() {
  const { homeId, roomId } = useParams<{ homeId: string; roomId: string }>();
  const [roomData, setRoomData] = useState<BaseRoom | null>(null);
  const [shapes, setShapes] = useState<ShapeData[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [itemSounds, setItemSounds] = useState<ItemSoundsData>({ itemName: "", sounds: [] });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0, scale: 1, scaleAxis: "" });
  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null);
  const [showSoundList, setShowSoundList] = useState<boolean>(false);
  console.log("selectedItemId", selectedItemId);
  const handleViewSoundList = () => {
    setShowSoundList((prev) => !prev);
    if (!showSoundList) {
      setSelectedItemId(null);
    }
    if (!selectedItemId) {
      setItemSounds({ itemName: "", sounds: [] });
    }
  };

  const getItemSounds = useCallback(async (itemId: number) => {
    const data = await fetchItemSounds(itemId);
    setItemSounds(data);
  }, []);

  const handleItemClick = (itemId: number) => {
    setSelectedItemId(itemId);
    getItemSounds(itemId);
    setShowSoundList(true);
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

      <div className="fixed top-0 right-0 p-3 cursor-pointer" onClick={handleViewSoundList}>
        <BiSolidPlaylist className="text-xl md:text-4xl" color="white" />
      </div>

      {showSoundList && (
        <div className="fixed top-0 right-0 bg-stone-900 z-10 min-w-full md:min-w-[350px] md:max-w-[350px] min-h-[100px] md:min-h-[150px]">
          <div className="flex justify-end p-3">
            <BiSolidPlaylist color="#f5946d" onClick={handleViewSoundList} className="text-xl md:text-4xl" />
          </div>
          {selectedItemId ? (
            <ItemSoundList itemSounds={itemSounds} />
          ) : (
            <div className="text-white text-center text-sm md:text-lg">아이템을 클릭해주세요.</div>
          )}
        </div>
      )}
    </RoomDetailLayout>
  );
}
