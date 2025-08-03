import { useEffect, useRef, useState, useCallback } from "react";
import PageLayout from "../../components/layout/PageLayout";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../../constants/size";
import { usePieceStore } from "../../hooks/admin/usePieceStore";
import { useSpaceStore } from "../../hooks/admin/useSpaceStore";
import {
  UniverseType,
  useUniverseStore,
} from "../../hooks/admin/useUniverseStore";
import SpaceSelector from "./SpaceSelector";
import { getUniverseTree } from "../../service/universeService";
import {
  public_getUniverse,
  public_getUniverseDetail,
  public_getUniverseRandom,
} from "../../service/user_universeService";
import UniverseDetailInfo from "./detail/UniverseDetailInfo";
import { BiFullscreen } from "react-icons/bi";
import PieceDetailPanel from "../piece/PieceDetailPanel";
import { RandomUniverse } from "../../types/universe";
import UniverseListItem from "./detail/UniverseListItem";
import { useParams } from "react-router-dom";

export default function UniverseDetailPage() {
  const spaceContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { id } = useParams();
  const universeIdParsed = parseInt(id || "", 10);

  const {
    universeId,
    activeInnerImageId,
    rootUniverse,
    setUniverseId,
    setRootUniverse,
    setUniverseData,
  } = useUniverseStore();

  const {
    currentSpaceId,
    getSpaceById,
    setCurrentSpaceId,
    setCurrentSpace,
    setParentSpaceId,
  } = useSpaceStore();

  const { currentPiece, setCurrentPiece } = usePieceStore();

  const [alert, setAlert] = useState<string>("");
  const [suggestUniverses, setSuggestUniverses] = useState<RandomUniverse[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (rootUniverse == null) {
      loadInitialData(null);
      return;
    }

    if (currentSpaceId === -1) {
      setUniverseData(rootUniverse.innerImageId, rootUniverse.spaces, rootUniverse.pieces);
      return;
    }

    if (currentSpaceId != null) {
      const space = getSpaceById(currentSpaceId);
      if (space) {
        setUniverseData(space.innerImageId, space.spaces, space.pieces);
      } else {
        // 공간을 못 찾으면 루트로 복귀
        setUniverseData(
          rootUniverse.innerImageId,
          rootUniverse.spaces,
          rootUniverse.pieces
        );
        setCurrentSpaceId(-1);
        setCurrentSpace(null);
      }
    }
  }, [currentSpaceId, rootUniverse, universeId]);

  useEffect(() => {
    if (!contentRef.current || !scrollContainerRef.current) return;

    const observer = new ResizeObserver(() => {
      const contentHeight = contentRef.current?.offsetHeight || 0;
      const containerHeight = scrollContainerRef.current?.offsetHeight || 0;

      if (contentHeight < containerHeight && hasMore && !loading) {
        loadMoreSuggestUniverses();
      }
    });

    observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, [suggestUniverses, hasMore, loading]);

  // 초기 데이터 로딩 함수
  const loadInitialData = async (spaceID: number | null) => {
    try {
      console.log("실행?", universeId);
      
      if (universeId == null) {
        if (universeIdParsed != null) {
          setUniverseId(universeIdParsed);
        } else return;
      }

      const currentUniverse: UniverseType = await public_getUniverseDetail(
        universeId!
      );
      console.log("currentUniverse", currentUniverse);
      
      if (spaceID == null) {
        setRootUniverse(currentUniverse);
        setUniverseData(
          currentUniverse.innerImageId,
          currentUniverse.spaces,
          currentUniverse.pieces
        );
        setCurrentSpaceId(-1);
        setCurrentSpace(null);
        setParentSpaceId(-1);
      } else {
        setRootUniverse(currentUniverse);
        const space = getSpaceById(spaceID);
        if (space != null) {
          setUniverseData(space.innerImageId, space.spaces, space.pieces);
        }
      }

      // 추천 유니버스 호출 (초기)
      const initialExceptIds = [universeId!];
      const initialSuggest = await public_getUniverseRandom(initialExceptIds);

      // API 응답 구조에 따라 수정
      const newUniverses = initialSuggest.universes || [];
      setSuggestUniverses(newUniverses);

      // 받아온 데이터가 0개면 더 이상 없음
      setHasMore(newUniverses.length > 0);

    } catch (error: any) {
      setAlert("유니버스 조회 중 오류가 발생했습니다.");
    }
  };

  // 더 많은 추천 유니버스 로딩 함수
  const loadMoreSuggestUniverses = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      // 현재까지 불러온 모든 유니버스 ID를 exceptIds에 포함
      const currentExceptIds = [
        ...(Number.isFinite(universeId) ? [universeId as number] : []),
        ...suggestUniverses.map((u) => u.id!),
      ];

      const newData = await public_getUniverseRandom(currentExceptIds);
      const newUniverses = newData.universes || [];

      if (newUniverses.length === 0) {
        // 더 이상 불러올 데이터가 없음
        setHasMore(false);
      } else {
        // 기존 데이터에 새 데이터 추가
        setSuggestUniverses((prev) => {
          const updated = [...prev, ...newUniverses];
          return updated;
        });
      }
    } catch (error) {
      console.error("추천 유니버스 불러오기 실패:", error);
      setAlert("추천 유니버스 불러오기 실패");
    } finally {
      setLoading(false);
    }
  };

  // 스크롤 핸들러
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || loading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      loadMoreSuggestUniverses();
    }
  }, [loading, hasMore, suggestUniverses]);

  // 스크롤 이벤트 등록
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleFullScreen = () => {
    if (spaceContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        spaceContainerRef.current.requestFullscreen().catch(console.error);
      }
    }
  };

  const closePiecePanel = () => {
    setCurrentPiece(null);
  };

  return (
    <PageLayout>
      <div
        className="w-full flex flex-col md:flex-row gap-1 p-3"
        style={{
          height: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
        }}
      >
        {/* 스페이스 영역 */}
        <div
          ref={spaceContainerRef}
          className="w-full md:w-4/5 aspect-square bg-black rounded-[10px] min-h-[400px]"
        >
          <div className="relative flex items-center justify-center h-full group">
            <button
              onClick={handleFullScreen}
              className="z-10 absolute cursor-pointer bottom-3 right-3 w-9 h-9 flex items-center justify-center backdrop-blur-sm rounded-full text-white hover:opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <BiFullscreen size={20} />
            </button>
            <SpaceSelector innerImageId={activeInnerImageId} />
            <PieceDetailPanel piece={currentPiece} onClose={closePiecePanel} />
          </div>
        </div>

        {/* 오른쪽 영역 */}
        <div className="w-full md:w-1/3 flex flex-col gap-1 p-3">
          <UniverseDetailInfo />

          {/* 수정된 스크롤 영역 */}
          <div className="flex-1 min-h-0">
            <div
              ref={scrollContainerRef}
              className="h-full overflow-y-auto"
              style={{ maxHeight: "100%" }}
            >
              <div ref={contentRef} className="grid grid-cols-2 gap-2 p-2">
                {suggestUniverses.map((universe, index) => (
                  <div key={`${universe.id}-${index}`}>
                    <UniverseListItem
                      id={universe.id}
                      thumbnailId={universe.thumbnailId}
                      title={universe.title}
                      author={universe.author}
                    />
                  </div>
                ))}
                {/* 로딩 상태 */}
                {loading && (
                  <div className="col-span-2 flex justify-center py-4">
                    <div className="animate-pulse text-gray-500">로딩</div>
                  </div>
                )}
                {/* 모든 데이터 로드 완료 */}
                {!hasMore && !loading && suggestUniverses.length > 0 && (
                  <div className="col-span-2 flex justify-center py-4">
                    <div className="text-gray-400 text-sm">
                      유니버스 다 탐색함
                    </div>
                  </div>
                )}
                {/* 데이터가 없을 때 */}
                {!hasMore && !loading && suggestUniverses.length === 0 && (
                  <div className="col-span-2 flex justify-center py-8">
                    <div className="text-gray-400 text-center">
                      <div className="text-lg mb-2">🌌</div>
                      <div>추천할 유니버스가 없습니다.</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 알림 메시지 */}
      {/* {alert && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {alert}
          <button onClick={() => setAlert("")} className="ml-2 font-bold">
            ×
          </button>
        </div>
      )} */}
    </PageLayout>
  );
}
