import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { soundListHeaderTitles } from "../constants/headerList";
import { SoundListItem as SoundItem } from "../types/sound";
import { IoIosArrowForward } from "react-icons/io";
import { FaDoorClosed, FaDoorOpen } from "react-icons/fa";
import CircleButton from "./common/CircleButton";

type SoundListItemProps = {
  sound: SoundItem;
  currentPage: number;
  size: number;
  index: number;
};

export default function SoundListItem({ sound, currentPage, size, index }: SoundListItemProps) {
  const {
    homeId,
    roomId,
    // audioFileId,
    homeName,
    roomName,
    itemName,
    name,
    // updatedDate,
    // createdDate,
  } = sound;
  const listNumber = (currentPage - 1) * size + index + 1;

  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <li className="relative py-2 flex items-center text-center rounded-md bg-[#fbfafa] shadow ">
      <span style={{ width: soundListHeaderTitles[0].width }}>{listNumber}</span>

      <div className="flex-center" style={{ width: soundListHeaderTitles[1].width }}>
        <p className="text-center w-full">{homeName}</p>
        <div className="w-5 h-5 flex items-center  justify-center flex-shrink-0 mx-2">
          <IoIosArrowForward color="#F5946D" size={20} />
        </div>
      </div>
      <div className="flex-center" style={{ width: soundListHeaderTitles[2].width }}>
        <p className="text-center w-full">{roomName}</p>
        <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mx-2">
          <IoIosArrowForward color="#F5946D" size={20} />
        </div>
      </div>

      <div className="flex-center" style={{ width: soundListHeaderTitles[3].width }}>
        <p className="text-center w-full">{itemName}</p>
        <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mx-2">
          <IoIosArrowForward color="#F5946D" size={20} />
        </div>
      </div>

      <div className="w-full text-center" style={{ width: soundListHeaderTitles[4].width }}>
        {name}
      </div>

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ width: soundListHeaderTitles[5].width }}
      >
        <CircleButton
          hasBorder={false}
          label={
            isHovered ? (
              <FaDoorOpen
                size={20}
                color="#5f5c5d"
                className="hover:text-white"
                // <Route path="/main/home/:homeId/rooms/:roomId" element={<RoomDetailPage />} />

                onClick={() => navigate(`/main/home/${homeId}/rooms/${roomId}`)}
              />
            ) : (
              <FaDoorClosed size={20} color="#5f5c5d" className="hover:text-white" />
            )
          }
          onClick={() => {}}
        />
      </div>
    </li>
  );
}
