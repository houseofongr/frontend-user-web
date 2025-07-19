import React, { useEffect, useState } from "react";
import Pagination from "../../components/common/Pagination";
import { getPieceDetail } from "../../service/pieceService";
import { IoIosClose } from "react-icons/io";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { usePieceStore } from "../../hooks/admin/usePieceStore";
import { useUniverseStore } from "../../hooks/admin/useUniverseStore";
import { SoundType } from "../../hooks/admin/useSoundStore";
import PieceSoundItem from "./PieceSoundItem";

interface PieceType {
  pieceId: number;
  title: string;
  description: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  [key: string]: any;
}

interface PieceDetailPanelProps {
  piece: PieceType | null;
  onClose: () => void;
}

const PieceDetailPanel: React.FC<PieceDetailPanelProps> = ({
  piece,
  onClose,
}) => {

  const [sounds, setSounds] = useState<SoundType[]>([]);
  const [pagination, setPagination] = useState({
    size: 10,
    currentPage: 1,
    totalPages: 1,
    totalElements: 0,
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [showInfoEdit, setShowInfoEdit] = useState(false);
  // const [alert, setAlert] = useState<{
  //   text: string;
  //   type: AlertType;
  //   subText: string | null;
  // } | null>(null);

  const fetchPieceDetail = async (page: number) => {
    if (!piece) return;
    try {
      const data = await getPieceDetail(piece.pieceId, page, pagination.size);
      setSounds(data.sounds);
      setPagination({
        size: data.pagination.size,
        currentPage: data.pagination.pageNumber,
        totalPages: data.pagination.totalPages,
        totalElements: data.pagination.totalElements,
      });
    } catch (error) {
      console.error("피스 상세 정보를 가져오지 못했습니다:", error);
    }
  };

  useEffect(() => {
    fetchPieceDetail(1);
  }, [piece?.pieceId]);

  // ⚙️ 이벤트 핸들러
  const handlePageChange = (newPage: number) => fetchPieceDetail(newPage);
console.log("piece", piece);

  if (!piece) return null;
  return (
    <>
      <div className="absolute top-0 right-0 h-full w-80 bg-black/70 shadow-lg border-l z-20 pt-13 overflow-y-auto">
        {/* 상단 제목/설명 */}
        <div className="text-xl px-8 mb-4 text-white">
          {/* 수정 아이콘 버튼 (닫기 버튼 왼쪽) */}
          <button
            className="absolute top-4 right-12 text-white hover:text-gray-400 transition cursor-pointer"
            onClick={() => setMenuOpen(true)}
          >
            <BiDotsVerticalRounded size={21} />
          </button>
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white hover:text-rose-300 transition cursor-pointer"
          >
            <IoIosClose size={30} />
          </button>
          <div className="font-bold">{piece.title}</div>
          <div className="text-sm pr-10 pt-1">{piece.description}</div>
        </div>

        {/* 사운드 리스트 */}
        <div className="relative p-4 pt-5">
          {sounds.length === 0 ? (
            <div className="text-sm text-gray-300">
              등록된 사운드가 없습니다.
            </div>
          ) : (
            sounds.map((s, i) => (
              <PieceSoundItem
                key={`${s.soundId}-${i}`}
                index={i + (pagination.currentPage - 1) * pagination.size}
                soundData={s}
              />
            ))
          )}
        </div>
        {/* 페이지네이션 */}
        {pagination.totalPages >= 1 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      z
    </>
  );
};

export default PieceDetailPanel;
