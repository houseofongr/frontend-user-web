import React, { useState, useRef, useEffect } from "react";
import API_CONFIG from "../../config/api";
import { useUniverseStore } from "../../hooks/admin/useUniverseStore";
import { PieceType } from "../../hooks/admin/usePieceStore";
import { SpaceType } from "../../hooks/admin/useSpaceStore";
import { IoIosArrowBack } from "react-icons/io";
import { ScaleLoader } from "react-spinners";
import { useSpaceStore } from "../../hooks/admin/useSpaceStore";
import { usePieceStore } from "../../hooks/admin/usePieceStore";

interface PercentPoint {
  xPercent: number;
  yPercent: number;
}

interface SpaceSelectorProps {
  innerImageId: number | null;
}

export default function SpaceSelector({
  innerImageId,
}: SpaceSelectorProps) {
  const { rootUniverse } = useUniverseStore();

  const {
    currentSpaceId,
    setParentSpaceId,
    setCurrentSpaceId,
    setCurrentSpace,
    parentSpaceId,
    getParentSpaceIdById,
    existingSpaces,
  } = useSpaceStore();

  const { existingPieces, setCurrentPiece } = usePieceStore();

  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [hoveredSpaceIndex, setHoveredSpaceIndex] = useState<number | null>(null);
  const [hoveredPieceIndex, setHoveredPieceIndex] = useState<number | null>(null);
  const [popupData, setPopupData] = useState<{
    x: number;
    y: number;
    title: string;
    description: string;
  } | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const imgRef = useRef<HTMLImageElement>(null);

  // 이미지 크기 추적
  useEffect(() => {
    if (!imgRef.current) return;

    const updateSize = () => {
      setImageSize({
        width: imgRef.current?.clientWidth ?? 0,
        height: imgRef.current?.clientHeight ?? 0,
      });
    };

    const observer = new ResizeObserver(updateSize);

    // 다음 프레임에서 observer 등록
    requestAnimationFrame(() => {
      if (imgRef.current) {
        observer.observe(imgRef.current);
        updateSize(); // 초기 호출
      }
    });

    return () => observer.disconnect();
  }, [imgSrc]); // ← innerImageId가 아니라 imgSrc로 변경

  // 이미지 로딩
  useEffect(() => {
    if (innerImageId === -1 || innerImageId === null) {
      setImgSrc(null);
      return;
    }

    const url = `${API_CONFIG.PUBLIC_IMAGE_LOAD_API}/${innerImageId}`;
    const img = new Image();

    img.src = url;
    img.onload = () => {
      setImgSrc(url);
      setLoading(false);
    };
    img.onerror = () => {
      setImgSrc(null);
      setLoading(false);
    };
  }, [innerImageId]);

  // 유틸 함수
  const toPixel = (point: PercentPoint) => ({
    x: point.xPercent * imageSize.width,
    y: point.yPercent * imageSize.height,
  });

  const calcBoxStyle = (start: PercentPoint, end: PercentPoint) => {
    const s = toPixel(start);
    const e = toPixel(end);
    const left = Math.min(s.x, e.x);
    const top = Math.min(s.y, e.y);
    const width = Math.abs(e.x - s.x);
    const height = Math.abs(e.y - s.y);

    return {
      left: `calc(50% - ${imageSize.width / 2}px + ${left}px)`,
      top: `calc(50% - ${imageSize.height / 2}px + ${top}px)`,
      width: `${width}px`,
      height: `${height}px`,
    };
  };

  // 화면 전환 함수
  const handleMoveToSpace = (space: SpaceType) => {
    setParentSpaceId(currentSpaceId ?? -1);
    setCurrentSpaceId(space.spaceId);
    setCurrentSpace(space);
    setPopupData(null);
  };

  const handleMoveToPiece = (piece: PieceType) => {
    setCurrentPiece(piece);
    console.log(piece);

  };
  const handleSpaceMouseEnter = (index: number) => {
    const space = existingSpaces[index];
    const start = toPixel({ xPercent: space.startX, yPercent: space.startY });
    const end = toPixel({ xPercent: space.endX, yPercent: space.endY });
    const left = Math.min(start.x, end.x);
    const top = Math.min(start.y, end.y);
    const width = Math.abs(end.x - start.x);
    const height = Math.abs(end.y - start.y);

    setHoveredSpaceIndex(index);
    setPopupData({
      x: left + width / 2 + 10,
      y: top + height / 2 + 5,
      title: space.title,
      description: space.description,
    });
  };

  const handlePieceMouseEnter = (index: number) => {
    const piece = existingPieces[index];
    const start = toPixel({ xPercent: piece.startX, yPercent: piece.startY });
    const end = toPixel({ xPercent: piece.endX, yPercent: piece.endY });
    const left = Math.min(start.x, end.x);
    const top = Math.min(start.y, end.y);
    const width = Math.abs(end.x - start.x);
    const height = Math.abs(end.y - start.y);

    setHoveredPieceIndex(index);
    setPopupData({
      x: left + width / 2 + 10,
      y: top + height / 2 + 5,
      title: piece.title,
      description: piece.description,
    });
  };
  const handleSpaceMouseLeave = () => {
    setHoveredSpaceIndex(null);
    setPopupData(null);
  };

  const handlePieceMouseLeave = () => {
    setHoveredPieceIndex(null);
    setPopupData(null);
  };

  const handleBackClick = () => {
    if (parentSpaceId == -1) {
      setParentSpaceId(-1);
      setCurrentSpaceId(-1);
    } else {
      const parentId = getParentSpaceIdById(parentSpaceId);
      if (parentId != null) {
        setParentSpaceId(parentId);
        setCurrentSpaceId(parentSpaceId);
      }
    }
  };

  return (
    <div
      className="relative w-full h-full"
    >
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70">
          <ScaleLoader width={2} height={40} color="#F5946D" />
        </div>
      )}

      {!loading && (
        <>
          {/* 뒤로가기 */}
          {currentSpaceId !== rootUniverse?.universeId &&
            currentSpaceId !== -1 && (
              <div
                className="absolute top-2 left-2 px-4 py-2 z-10 text-white cursor-pointer hover:opacity-90"
                onClick={handleBackClick}
              >
                <IoIosArrowBack size={24} />
              </div>
            )}

          {/* 이미지 */}
          {imgSrc && (
            <img
              ref={imgRef}
              src={imgSrc}
              alt="space-image"
              loading="eager"
              className="object-contain block mx-auto max-h-full max-w-full"
              style={{ userSelect: "none", pointerEvents: "none" }}
              draggable={false}
            />
          )}

          {/* 기존 스페이스 박스 */}
          {existingSpaces.map((space, index) => (
            <div
              key={`space-${index}`}
              className="absolute"
              style={calcBoxStyle(
                { xPercent: space.startX, yPercent: space.startY },
                { xPercent: space.endX, yPercent: space.endY }
              )}
              onMouseEnter={() => handleSpaceMouseEnter(index)}
              onMouseLeave={handleSpaceMouseLeave}
            >
              <div
                className={`w-full h-full border-3 border-amber-600 bg-white/70 cursor-pointer transition-opacity duration-300 ${hoveredSpaceIndex === index ? "opacity-100" : "opacity-30"
                  }`}
                onClick={() => handleMoveToSpace(space)}
              />
            </div>
          ))}

          {existingPieces.map((piece, index) => (
            <div
              key={`piece-${index}`}
              className="absolute"
              style={calcBoxStyle(
                { xPercent: piece.startX, yPercent: piece.startY },
                { xPercent: piece.endX, yPercent: piece.endY }
              )}
              onMouseEnter={() => handlePieceMouseEnter(index)}
              onMouseLeave={handlePieceMouseLeave}
            >
              <div
                className={`w-full h-full border-3 border-blue-600 bg-white/70 cursor-pointer transition-opacity duration-300 ${hoveredPieceIndex === index ? "opacity-100" : "opacity-30"
                  }`}
                onClick={() => handleMoveToPiece(piece)}
              />
            </div>
          ))}

          {/* 팝업 */}
          {popupData && (
            <div
              className="absolute bg-white p-2 rounded shadow-md max-w-xs text-sm z-30 pointer-events-none"
              style={{
                left: `calc(50% - ${imageSize.width / 2}px + ${popupData.x}px)`,
                top: `calc(50% - ${imageSize.height / 2}px + ${popupData.y}px)`,
              }}
            >
              <div className="font-semibold">{popupData.title}</div>
              <div className="text-xs mt-1">{popupData.description}</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
