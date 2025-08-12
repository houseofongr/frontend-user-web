import { BiDotsVerticalRounded } from "react-icons/bi";
import { convertUnixToDate } from "../../utils/formatDate";
import { useEffect, useRef, useState } from "react";
import { TbMusic } from "react-icons/tb";
import { SoundType } from "../../hooks/admin/useSoundStore";
import SoundDetailModal from "../Sound/SoundDetailModal";

interface SoundItemProps {
  index: number;
  soundData: SoundType;
}

enum ModalType {
  SoundDetail,
  EditSound,
  EditInfo,
  DeleteSound,
}

const SoundItem: React.FC<SoundItemProps> = ({ index, soundData }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState<ModalType | null>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  // 메뉴와 아이템을 감지할 ref
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // 외부 클릭 감지용 useEffect
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const ShowSoundDetailModal = () => {
    if (!menuOpen) {
      setShowModal(ModalType.SoundDetail);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    setMenuOpen(true);
    const rect = e.currentTarget.getBoundingClientRect();

    setMenuOpen(true);
    setMenuPosition({
      top: rect.bottom + 4, // 요소 아래에 위치
      left: rect.left - 180,
    });
  };

  return (
    <div
      key={index}
      onClick={ShowSoundDetailModal}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className="relative overflow-visible"
    >
      <div className="flex flex-col items-start gap-2 border-b py-3 group text-white cursor-pointer hover:opacity-70 transition-all duration-200">
        {/* 트랙 번호 */}
        <div className="font-semibold text-primary">TRACK NO. {index + 1}</div>

        <div className="flex flex-row w-full">
          {/* 아이콘 */}
          <div className="mr-3">
            <TbMusic size={25} />
          </div>

          {/* 정보 영역 */}
          <div className="flex-1 relative mb-2">
            <div className="text-sm font-semibold">{soundData.title}</div>
            <div className="text-xs mt-1 mr-5">{soundData.description}</div>
          </div>

          {/* 날짜 */}
          <div className="text-[11px] absolute bottom-1 right-0">
            {convertUnixToDate(soundData.createdTime).default}
          </div>
        </div>
      </div>
      {showModal == ModalType.SoundDetail && (
        <SoundDetailModal onClose={() => setShowModal(null)} data={soundData} />
      )}
    </div>
  );
};

export default SoundItem;
