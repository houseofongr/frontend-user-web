import { MdAudiotrack } from "react-icons/md";
import { formatDate } from "../utils/formatDate";
import { SoundSource } from "../types/sound";
import CardLabel from "./CardLabel";

type SoundItemProps = {
  index: number;
  sound: SoundSource;
  onClick?: () => void;
};
export default function SoundItem({ index, sound, onClick }: SoundItemProps) {
  return (
    <li className="group/item flex flex-col cursor-pointer pb-3 px-1 w-full " onClick={onClick}>
      <div className="group/play">
        <CardLabel text={`TRACK NO.${index + 1}`} hasBorder={false} hasPadding={false} />
        <div className="border border-transparent group-hover/play:border-[#F5946D]">
          <div className="flex gap-2 py-1">
            <div className=" min-w-[30px] max-w-[30px] min-h-[38px] flex-center  border-stone-700  ">
              <MdAudiotrack size={20} />
            </div>

            <div>
              <p className="text-[14px] font-extralight text-white line-clamp-2 ">{sound.name}</p>
              <div className="text-xs text-gray-400">{formatDate(sound.updatedDate)}</div>
            </div>
          </div>
          {/* <p className="text-xs pl-1 text-white font-extralight line-clamp-2">{sound.description}</p> */}
        </div>
      </div>
    </li>
  );
}
