import { useState } from "react";
import { ItemSoundsData } from "../types/sound";
import SoundItem from "./SoundItem";

import PreviewContent from "./PreviewContent";
import { useSoundDetail } from "../hooks/useSoundData";
import SpinnerIcon from "./icons/SpinnerIcon";
import Modal from "./modal/Modal";
// import Pagination from "./common/Pagination";

type SoundListProps = {
  itemSounds: ItemSoundsData;
};

// const ITEM_SOUND_LIST = [
//   { id: 34, name: "아지가 밥먹는 소리", description: "냠냠", createdDate: "2025.02.15.", updatedDate: "2025.02.15." },
//   {
//     id: 35,
//     name: "아지가 밥먹는 소리 버전 아지가 밥먹는 소리 버전 2아지가 밥먹는 소리 버전 전 2아지가 밥먹는 소리 버전 ",
//     description: "아지가 맛있게 밥을 먹습니다. ",
//     createdDate: "2025.02.16.",
//     updatedDate: "2025.02.16.",
//   },
//   { id: 36, name: "아지가 밥먹는 소리", description: "냠냠", createdDate: "2025.02.15.", updatedDate: "2025.02.15." },
//   {
//     id: 37,
//     name: "아지가 밥먹는 소리 버전 2",
//     description: "아지가 맛있게 밥을 먹습니다. ",
//     createdDate: "2025.02.17.",
//     updatedDate: "2025.02.17.",
//   },
//   { id: 38, name: "아지가 밥먹는 소리", description: "냠냠", createdDate: "2025.02.18.", updatedDate: "2025.02.18." },
//   {
//     id: 39,
//     name: "아지가 밥먹는 소리 버전 2",
//     description: "아지가 맛있게 밥을 먹습니다. ",
//     createdDate: "2025.02.19.",
//     updatedDate: "2025.02.19.",
//   },
//   {
//     id: 40,
//     name: "아지가 밥먹는 소리 버전 2",
//     description: "아지가 맛있게 밥을 먹습니다. ",
//     createdDate: "2025.02.20.",
//     updatedDate: "2025.02.20.",
//   },
//   {
//     id: 41,
//     name: "아지가 밥먹는 소리 버전 2",
//     description: "아지가 맛있게 밥을 먹습니다. ",
//     createdDate: "2025.02.21.",
//     updatedDate: "2025.02.21.",
//   },
//   {
//     id: 42,
//     name: "아지가 밥먹는 소리 버전 2",
//     description: "아지가 맛있게 밥을 먹습니다. ",
//     createdDate: "2025.02.15.",
//     updatedDate: "2025.02.15.",
//   },
//   {
//     id: 43,
//     name: "아지가 밥먹는 소리 버전 2",
//     description: "아지가 맛있게 밥을 먹습니다. ",
//     createdDate: "2025.02.15.",
//     updatedDate: "2025.02.15.",
//   },
// ];

export default function ItemSoundList({ itemSounds }: SoundListProps) {
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const [targetSoundId, setTargetSoundId] = useState<number | null>(null);
  // const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: soundDetail, error, isLoading } = useSoundDetail(targetSoundId);

  const modalHandler = () => {
    setOpenPreview((prev) => !prev);
    setTargetSoundId(null);
  };

  const handleSoundClick = (soundSourceId: number) => {
    setTargetSoundId(soundSourceId);
    setOpenPreview(true);
  };

  return (
    <>
      <div className="text-white text-center md:pt-10 mb-5 text-sm md:text-lg">
        '{itemSounds.itemName}' 에 담겨있는 소리 목록
      </div>
      <div className="px-4 lg:py-4 mb-10 lg:mb-0" style={{ maxHeight: `${window.innerHeight}px` }}>
        <ul>
          {itemSounds.sounds.length > 0 &&
            itemSounds.sounds.map((sound, index) => (
              <SoundItem sound={sound} key={index} index={index} onClick={() => handleSoundClick(sound.id)} />
            ))}
          {/* {ITEM_SOUND_LIST.length > 0 &&
            ITEM_SOUND_LIST.map((sound, index) => (
              <SoundItem sound={sound} key={index} index={index} onClick={() => handleSoundClick(sound.id)} />
            ))} */}
        </ul>

        {/* <Pagination currentPage={1} totalPages={4} onPageChange={setCurrentPage} /> */}
      </div>

      {openPreview && targetSoundId !== null && (
        <Modal onClose={modalHandler}>
          {isLoading ? (
            <SpinnerIcon usage="page" />
          ) : error ? (
            <div className="text-white p-10 mt-4">음원 정보를 가져오지 못했습니다.</div>
          ) : (
            <PreviewContent data={soundDetail} />
          )}
        </Modal>
      )}
    </>
  );
}
