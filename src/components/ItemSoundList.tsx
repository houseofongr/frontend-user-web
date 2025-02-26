import { useState } from "react";
import { ItemSoundsData } from "../types/sound";
import SoundItem from "./SoundItem";

import PreviewContent from "./PreviewContent";
import { useSoundDetail } from "../hooks/useSoundData";
import SpinnerIcon from "./icons/SpinnerIcon";
import Modal from "./Modal";

type SoundListProps = {
  itemSounds: ItemSoundsData;
};

export default function ItemSoundList({ itemSounds }: SoundListProps) {
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const [targetSoundId, setTargetSoundId] = useState<number | null>(null);

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
    <div className="absolute top-0 right-0 bg-stone-900 px-4 py-5  min-w-[300px]">
      <div className="text-white text-center mb-5">'{itemSounds.itemName}' 에 담겨있는 소리</div>
      <ul>
        {itemSounds.sounds.length > 0 &&
          itemSounds.sounds.map((sound, index) => (
            <SoundItem sound={sound} key={index} index={index} onClick={() => handleSoundClick(sound.id)} />
          ))}
      </ul>
      {openPreview && targetSoundId !== null && (
        <Modal onClose={modalHandler}>
          {isLoading ? (
            <SpinnerIcon usage="page" />
          ) : error ? (
            <div className="text-white">음원 정보를 가져오지 못했습니다.</div>
          ) : (
            <PreviewContent data={soundDetail} />
          )}
        </Modal>
      )}
    </div>
  );
}
