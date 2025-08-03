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
  x: number;
  y: number;
}

interface SpaceSelectorProps {
  innerImageId: number | null;
}

export default function SpaceSelector({ innerImageId }: SpaceSelectorProps) {
  const { rootUniverse, universeInfo } = useUniverseStore();

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
  const [hoveredSpaceIndex, setHoveredSpaceIndex] = useState<number | null>(
    null
  );
  const [hoveredPieceIndex, setHoveredPieceIndex] = useState<number | null>(
    null
  );
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
  }, [imgSrc]);

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
    x: point.x * imageSize.width,
    y: point.y * imageSize.height,
  });

  // 화면 전환 함수
  const handleMoveToSpace = (space: SpaceType) => {
    setParentSpaceId(currentSpaceId ?? -1);
    setCurrentSpaceId(space.spaceId);
    setCurrentSpace(space);
    setPopupData(null);
  };

  const handleMoveToPiece = (piece: PieceType) => {
    setCurrentPiece(piece);
  };
  const handleSpaceMouseEnter = (index: number) => {
    const space = existingSpaces[index];
    const firstPoint = space.points[0];

    if (!firstPoint) return;

    const pixel = toPixel(firstPoint);

    setHoveredSpaceIndex(index);
    setPopupData({
      x: pixel.x + 10, // 살짝 오른쪽
      y: pixel.y + 5, // 살짝 아래
      title: space.title,
      description: space.description,
    });
  };

  const handlePieceMouseEnter = (index: number) => {
    const piece = existingPieces[index];
    const firstPoint = piece.points[0];

    if (!firstPoint) return;

    const pixel = toPixel(firstPoint);

    setHoveredPieceIndex(index);
    setPopupData({
      x: pixel.x + 10, // 오른쪽으로 살짝
      y: pixel.y + 5, // 아래로 살짝
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
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70">
          <ScaleLoader width={2} height={40} color="#F5946D" />
        </div>
      )}
      {!loading && (
        <>
          {universeInfo != null && (
            <div className="absolute top-2 px-4 py-2 z-10 text-white/60 text-sm ">
              {universeInfo.title}
            </div>
          )}
          {/* 뒤로가기 */}
          {currentSpaceId !== rootUniverse?.universeId &&
            currentSpaceId !== -1 && (
              <div
                className="absolute bottom-2 px-4 py-2 z-10 text-white cursor-pointer hover:opacity-90"
                onClick={handleBackClick}
              >
                <IoIosArrowBack size={24} />
              </div>
            )}

          {/* 이미지 */}
          {imgSrc && (
            <div className="flex items-center justify-center w-full h-full">
              <img
                ref={imgRef}
                src={imgSrc}
                alt="space-image"
                loading="eager"
                className="object-contain block mx-auto max-h-full max-w-full "
                style={{ userSelect: "none", pointerEvents: "none" }}
                draggable={false}
              />
            </div>
          )}

          {/* 기존 스페이스 박스 */}
          <svg
            className="absolute top-1/2 left-1/2 z-10"
            style={{
              transform: "translate(-50%, -50%)",
              width: imageSize.width,
              height: imageSize.height,
              pointerEvents: "none", // 개별 polygon에만 이벤트 적용
            }}
          >
            {existingSpaces.map((space, index) => {
              const points = space.points
                .map((point) => {
                  const { x, y } = toPixel(point);
                  return `${x},${y}`;
                })
                .join(" ");

              const isHovered = hoveredSpaceIndex === index;

              return (
                <polygon
                  key={`space-${index}`}
                  points={points}
                  fill="white"
                  fillOpacity={isHovered ? 0.7 : 0.3}
                  stroke="#f59e0b" // amber-600
                  strokeWidth={3}
                  className="cursor-pointer transition-opacity duration-300"
                  onMouseEnter={() => handleSpaceMouseEnter(index)}
                  onMouseLeave={handleSpaceMouseLeave}
                  onClick={() => handleMoveToSpace(space)}
                  style={{ pointerEvents: "auto" }}
                />
              );
            })}
          </svg>

          {/* 기존 피스 박스 */}
          <svg
            className="absolute top-1/2 left-1/2 z-10"
            style={{
              transform: "translate(-50%, -50%)",
              width: imageSize.width,
              height: imageSize.height,
              pointerEvents: "none", // polygon에만 이벤트 적용
            }}
          >
            {existingPieces.map((piece, index) => {
              const points = piece.points
                .map((point) => {
                  const { x, y } = toPixel(point);
                  return `${x},${y}`;
                })
                .join(" ");

              const isHovered = hoveredPieceIndex === index;

              return (
                <polygon
                  key={`piece-${index}`}
                  points={points}
                  fill="white"
                  fillOpacity={isHovered ? 0.7 : 0.3}
                  stroke="#2563eb" // blue-600
                  strokeWidth={3}
                  className="cursor-pointer transition-opacity duration-300"
                  onMouseEnter={() => handlePieceMouseEnter(index)}
                  onMouseLeave={handlePieceMouseLeave}
                  onClick={() => handleMoveToPiece(piece)}
                  style={{ pointerEvents: "auto" }}
                />
              );
            })}
          </svg>

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
