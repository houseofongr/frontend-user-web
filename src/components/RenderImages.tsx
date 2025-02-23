import { Link } from "react-router-dom";
import API_CONFIG from "../config/api";
import { UserMainHomeDetail } from "../types/home";
import SpinnerIcon from "./icons/SpinnerIcon";
import { useEffect, useState } from "react";

type RenderImagesProps = {
  homeId: number;
  homeData: UserMainHomeDetail;
  scale: number;
};

export default function RenderImages({ homeId, scale, homeData }: RenderImagesProps) {
  const totalImages = homeData.rooms.length + 1;
  const [loadedImages, setLoadedImages] = useState(0);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);

  useEffect(() => {
    if (loadedImages === totalImages) {
      setIsImagesLoaded(true);
    }
  }, [loadedImages, totalImages]);

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  return (
    <div className="relative flex-center flex-col">
      {!isImagesLoaded && <SpinnerIcon />}
      <h1 className={` bg-stone-700 px-4 py-2 text-gray-100 ${isImagesLoaded ? "inline" : "hidden"}`}>
        {homeData.homeName}
      </h1>
      <div className={isImagesLoaded ? "relative" : "hidden"}>
        <img
          alt="house-border-image"
          width={window.innerHeight}
          height={window.innerHeight}
          src={`${API_CONFIG.PRIVATE_IMAGE_LOAD_API}/${homeData.house.borderImageId}`}
          onLoad={handleImageLoad}
        />

        {homeData.rooms.map((room) => (
          <Link key={room.imageId} to={`/main/home/${homeId}/rooms/${room.roomId}`}>
            <img
              key={room.name}
              src={`${API_CONFIG.PRIVATE_IMAGE_LOAD_API}/${room.imageId}`}
              alt={room.name}
              width={Number(room.width) * scale}
              height={Number(room.height) * scale}
              onLoad={handleImageLoad}
              style={{
                position: "absolute",
                left: Number(room.x) * scale,
                top: Number(room.y) * scale,
                zIndex: room.z,
              }}
              className="transition-transform duration-300 ease-in-out hover:scale-105 hover:z-20 cursor-pointer"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
