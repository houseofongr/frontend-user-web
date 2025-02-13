import API_CONFIG from "../config/api";
import { UserMainHomeDetail } from "../types/home";

type RenderImagesProps = {
  homeData: UserMainHomeDetail;
  scale: number;
};

export default function RenderImages({ homeData, scale }: RenderImagesProps) {
  return (
    <section className="relative flex justify-center ">
      <div className="relative">
        <img
          alt="house-border-image"
          width={window.innerHeight}
          height={window.innerHeight}
          src={`${API_CONFIG.PRIVATE_IMAGE_LOAD_API}/${homeData.house.borderImageId}`}
        />

        {homeData.rooms.map((room) => (
          <img
            key={room.name}
            src={`${API_CONFIG.PRIVATE_IMAGE_LOAD_API}/${room.imageId}`}
            alt={room.name}
            width={Number(room.width) * scale}
            height={Number(room.height) * scale}
            style={{
              position: "absolute",
              left: Number(room.x) * scale,
              top: Number(room.y) * scale,
              zIndex: room.z,
            }}
            className="transition-transform duration-300 ease-in-out hover:scale-105 hover:z-20 cursor-pointer"
          />
        ))}
      </div>
    </section>
  );
}
