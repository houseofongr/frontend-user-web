import React, { useEffect, useState } from "react";
import Pagination from "../../components/common/Pagination";
import { getPieceDetail } from "../../service/pieceService";
import { IoIosClose } from "react-icons/io";
import { SoundType } from "../../hooks/admin/useSoundStore";
import PieceSoundItem from "./PieceSoundItem";
import { PieceType } from "../../hooks/admin/usePieceStore";

interface PieceDetailPanelProps {
  piece: PieceType | null;
  onClose: () => void;
}

const PieceDetailPanel: React.FC<PieceDetailPanelProps> = ({
  piece,
  onClose,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [sounds, setSounds] = useState<SoundType[]>([]);
  const [pagination, setPagination] = useState({
    size: 10,
    currentPage: 1,
    totalPages: 1,
    totalElements: 0,
  });

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

  // 화면 크기 체크
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ⚙️ 이벤트 핸들러
  const handlePageChange = (newPage: number) => fetchPieceDetail(newPage);

  if (!piece) return null;
  return (
    <>
      <div
        className={`${
          isMobile
            ? "fixed top-0 left-0 w-full h-full bg-black/90 shadow-lg border-l z-50 pt-13 overflow-y-auto transition-transform duration-300"
            : "absolute top-0 right-0 h-full w-80 bg-black/70 shadow-lg border-l z-20 pt-13 overflow-y-auto"
        }`}
      >
        {/* 상단 제목/설명 */}
        <div className="text-xl px-8 mb-4 text-white">
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
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
      z
    </>
  );
};

export default PieceDetailPanel;
