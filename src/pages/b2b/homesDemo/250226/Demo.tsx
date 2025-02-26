import { useEffect, useState } from "react";
import SpinnerIcon from "../../../../components/icons/SpinnerIcon";
import API_CONFIG from "../../../../config/api";

const PLANET_LIST = [
  {
    id: 1,
    name: "지구",
    src: "/images/demo/planet/cropped/planet_v1.png",
    x: 2700,
    y: 1730,
    width: 1666,
    height: 1666,
    imageId: 435,
    z: 1,
  },
  {
    id: 2,
    name: "수성", // 집 왼쪽 위
    src: "/images/demo/planet/cropped/planet_v2.png",
    x: 1200,
    y: 3000,
    width: 962,
    height: 962,
    imageId: 436,
    z: 1,
  },
  {
    id: 3,
    name: "토성",
    src: "/images/demo/planet/cropped/planet_v3.png",
    x: 400,
    y: 2400,
    width: 1100,
    height: 677,
    imageId: 437,
    z: 1,
  },
  {
    id: 4,
    name: "목성", // 화성이랑 붙어있는
    src: "/images/demo/planet/cropped/planet_v4.png",
    x: 487.42,
    y: 880,
    width: 1294,
    height: 1294,
    imageId: 438,
    z: 1,
  },
  {
    id: 5,
    name: "화성", // 목성이랑 붙어있는
    src: "/images/demo/planet/cropped/planet_v5.png",
    x: 1450,
    y: 1700,
    width: 784,
    height: 737,
    imageId: 439,
    z: 1,
  },
  {
    id: 6,
    name: "금성", // 지구 위에 있는 노란색
    src: "/images/demo/planet/cropped/planet_v6.png",
    x: 2930,
    y: 500,
    width: 998,
    height: 998,
    imageId: 440,
    z: 1,
  },
  {
    id: 7,
    name: "천왕성", // 최상단에 있는 하늘색 행성
    src: "/images/demo/planet/cropped/planet_v7.png",
    x: 2100,
    y: 240,
    width: 708,
    height: 708,
    imageId: 441,
    z: 1,
  },
  {
    id: 8,
    name: "해왕성", // 초록색
    src: "/images/demo/planet/cropped/planet_v8.png",
    x: 3050,
    y: 3600,
    width: 439,
    height: 475,
    imageId: 442,
    z: 1,
  },
];

const MAX_IMAGE_SIZE = 5000;

const calculateScale = () => {
  const heightScale = window.innerHeight / MAX_IMAGE_SIZE;
  const widthScale = window.innerWidth / MAX_IMAGE_SIZE;
  return Math.min(heightScale, widthScale);
};

export default function DemoPage() {
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const updateScale = () => setScale(calculateScale());
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  if (!scale) return <SpinnerIcon />;
  return (
    <div className="w-full flex flex-col bg-stone-800 pb-10">
      <section className="flex-center min-h-screen">
        <div className="relative">
          <img
            alt="public-home-background-image"
            width={Math.round(5000 * scale)}
            height={Math.round(5000 * scale)}
            src="/images/demo/house_bg_2.png"
          />

          {PLANET_LIST.map(({ imageId, name, width, height, x, y, z }) => (
            <div key={imageId} className="">
              <label className="absolute">{name}</label>
              <img
                key={name}
                src={`${API_CONFIG.PRIVATE_IMAGE_LOAD_API}/${imageId}`}
                // src={src}
                alt={name}
                width={Math.round(width * scale)}
                height={Math.round(height * scale)}
                style={{
                  position: "absolute",
                  left: Math.round(x * scale),
                  top: Math.round(y * scale),
                  zIndex: z,
                }}
                className="transition-transform duration-300 ease-in-out hover:scale-105 hover:z-20 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// const formatDataForView = (imageData: { width: number; height: number; scale: number; x: number; y: number }) => {
//   return {
//     x: Math.round(imageData.x * imageData.scale),
//     y: Math.round(imageData.y * imageData.scale),
//     width: Math.round(imageData.width * imageData.scale),
//     height: Math.round(imageData.height * imageData.scale),
//   };
// };
