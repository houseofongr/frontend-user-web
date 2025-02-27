import { useEffect, useState } from "react";
import SpinnerIcon from "../../../../components/icons/SpinnerIcon";
import API_CONFIG from "../../../../config/api";
import Modal from "../../../../components/Modal";
import FileUploadButton from "../../../../components/FileUploadButton";
import FileNameLabel from "../../../../components/FileNameLabel";
import { MdCancel } from "react-icons/md";

import CircleButton from "../../../../components/common/CircleButton";
import { FaSave } from "react-icons/fa";
import PreviewContentCopy from "../../../../components/PreviewContentCopy";

import { Link } from "react-router-dom";

const PLANET_LIST = [
  {
    id: 1,
    name: "지구",
    description: "13살 아랑이가 지구에 담고 싶은 소리",
    imgSrc: "/images/demo/planet/cropped/planet_v1.png",
    soundSrc: "/audio/HOO_01.mp3",
    audioFileId: 454,
    x: 2700,
    y: 1730,
    width: 1666,
    height: 1666,
    imageId: 435,
    z: 1,
    updatedDate: "2025.02.26",
  },
  {
    id: 2,
    name: "수성",
    description: "13살 상엽이가 수성에 담고 싶은 소리",
    imgSrc: "/images/demo/planet/cropped/planet_v2.png",
    soundSrc: "/audio/HOO_02.mp3",
    audioFileId: 455,
    x: 1200,
    y: 3000,
    width: 962,
    height: 962,
    imageId: 436,
    z: 1,
    updatedDate: "2025.02.26",
  },
  {
    id: 3,
    name: "토성",
    description: "13살 선영이가 토성에 담고 싶은 소리",
    imgSrc: "/images/demo/planet/cropped/planet_v3.png",
    soundSrc: "/audio/HOO_03.mp3",
    audioFileId: 452,
    x: 400,
    y: 2400,
    width: 1100,
    height: 677,
    imageId: 437,
    z: 1,
    updatedDate: "2025.02.26",
  },
  {
    id: 4,
    name: "목성",
    description: "13살 아진이가 목성에 담고 싶은 소리. 아진이가 부르는 노래 소리",
    imgSrc: "/images/demo/planet/cropped/planet_v4.png",
    soundSrc: "",
    audioFileId: 456,
    x: 487.42,
    y: 880,
    width: 1294,
    height: 1294,
    imageId: 438,
    z: 1,
    updatedDate: "2025.02.26",
  },
  {
    id: 5,
    name: "화성",
    description: "13살 율리가 지구에 담고 싶은 소리. 율리가 치는 기타 소리",
    imgSrc: "/images/demo/planet/cropped/planet_v5.png",
    soundSrc: "",
    audioFileId: 457,
    x: 1450,
    y: 1700,
    width: 784,
    height: 737,
    imageId: 439,
    z: 1,
    updatedDate: "2025.02.26",
  },
  {
    id: 6,
    name: "금성",
    description: "13살 솔리가 금성에 담고 싶은 소리. 물 흐르는 소리",
    imgSrc: "/images/demo/planet/cropped/planet_v6.png",
    soundSrc: "",
    audioFileId: 458,
    x: 2930,
    y: 500,
    width: 998,
    height: 998,
    imageId: 440,
    z: 1,
    updatedDate: "2025.02.26",
  },
  {
    id: 7,
    name: "천왕성",
    description: "13살 줄리가 천왕성에 담고 싶은 소리",
    imgSrc: "/images/demo/planet/cropped/planet_v7.png",
    soundSrc: "",
    audioFileId: 0,
    x: 2100,
    y: 240,
    width: 708,
    height: 708,
    imageId: 441,
    z: 1,
    updatedDate: "2025.02.26",
  },
  {
    id: 8,
    name: "해왕성",
    description: "13살 용창이가 해왕성에 담고 싶은 소리",
    imgSrc: "/images/demo/planet/cropped/planet_v8.png",
    soundSrc: "",
    audioFileId: 0,
    x: 3050,
    y: 3600,
    width: 439,
    height: 475,
    imageId: 442,
    z: 1,
    updatedDate: "2025.02.26",
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
  const [selectedPlanetId, setSelectedPlanetId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const audioFileSaveHandler = async () => {
    // const token = sessionStorage.getItem("authToken");

    if (!file) return;
    const formData = new FormData();
    formData.append("audios", file);
    // dev.file.archiveofongr.site/public/audios
    try {
      console.log(API_CONFIG.PUBLIC_AUDIO_LOAD_API, "?");
      const response = await fetch(`https://dev.file.archiveofongr.site/public/audios`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to save audio file");
      } else {
        console.log("res.ok!!!", response);
      }
    } catch (error) {
      console.error("json 파싱 오류", error);
    }
  };

  useEffect(() => {
    const updateScale = () => setScale(calculateScale());
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const selectedPlanet = PLANET_LIST.find((planet) => planet.id === selectedPlanetId) || null;
  console.log("selectedPlanet", selectedPlanet);

  if (!scale) return <SpinnerIcon />;
  return (
    <div className="w-full h-full flex flex-col bg-stone-800 ">
      {/* <HeaderForDarkBackground /> */}
      <Link to={"/"} className="absolute top-10 left-10">
        <img src={"/images/logo/logo_for-dark-bg.png"} alt="archive of ongr logo" width={65} height={65} />
      </Link>
      <section className="flex-center">
        <div className="relative">
          <img
            alt="public-home-background-image"
            width={Math.round(5000 * scale)}
            height={Math.round(5000 * scale)}
            src="/images/demo/house_bg_2.png"
          />

          {PLANET_LIST.map(({ id, imageId, name, width, height, x, y, z }) => (
            <div key={imageId}>
              {id < 4 && (
                <label
                  className="text-xs p-1 bg-yellow-200"
                  style={{
                    position: "absolute",
                    left: Math.round(x * scale - 20),
                    top: Math.round(y * scale + 90),
                    zIndex: 10,
                  }}
                >
                  click here!
                </label>
              )}
              {/* <label
                className="text-xs text-white bg-black"
                style={{
                  position: "absolute",
                  left: Math.round(x * scale - 20),
                  top: Math.round(y * scale + 90),
                  zIndex: 3,
                }}
              >
                {name}
              </label> */}

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
                onClick={() => setSelectedPlanetId(id)}
              />
            </div>
          ))}
        </div>
      </section>
      <div className=" bg-neutral-100 rounded-4xl py-3  flex-col w-1/5 gap-3 p-5 absolute top-[20%]">
        <button> 퍼블릭 음원 파일 업로드</button>
        <input id="sound-file" type="file" accept="audio/*" className="hidden" onChange={handleFileUpload} />
        <div>
          <FileUploadButton htmlFor="sound-file" size="small" />
          {file && (
            <div className="w-full flex justify-between items-center py-4">
              <FileNameLabel fileName={file.name} />
              <button type="button" onClick={() => setFile(null)}>
                <MdCancel />
              </button>
            </div>
          )}
        </div>
        <div className="text-center mt-4">
          <CircleButton label={<FaSave />} hasBorder text="save" onClick={audioFileSaveHandler} />
        </div>
      </div>

      {selectedPlanet && (
        <Modal
          onClose={() => {
            setSelectedPlanetId(null);
          }}
        >
          {/* <PreviewContent data={selectedPlanet} /> */}
          <PreviewContentCopy data={selectedPlanet} />
        </Modal>
      )}
    </div>
  );
}
