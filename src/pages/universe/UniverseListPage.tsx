import { useEffect, useRef, useState, useCallback } from "react";
import PageLayout from "../../components/layout/PageLayout";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../../constants/size";
import { UniverseInfoType } from "../../types/universe";
import UniverseListItem from "./detail/UniverseListItem";
import { public_getUniverse } from "../../service/user_universeService";
import { useUniverseStore } from "../../hooks/admin/useUniverseStore";

const PAGE_SIZE = 3;

export default function UniverseListPage() {
  const { resetUniverse } = useUniverseStore();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [alert, setAlert] = useState<string>("");
  const [universes, setUniverses] = useState<UniverseInfoType[]>([]);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const [hasMore, setHasMore] = useState(true);
  const hasMoreRef = useRef(true);
  const pageRef = useRef(1);

  const loadMoreSuggestUniverses = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    try {
      const nextPage = pageRef.current + 1;
      const data = await public_getUniverse(nextPage, PAGE_SIZE, null, null);
      setUniverses((prev) => [...prev, ...data.universes]);
      pageRef.current = nextPage;

      const more = data.universes.length === PAGE_SIZE;
      setHasMore(more);
      hasMoreRef.current = more;
    } catch (error) {
      setAlert("유니버스 추가 조회 중 오류가 발생했습니다.");
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  const onScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container || loadingRef.current || !hasMoreRef.current) return;

    const { scrollTop, clientHeight, scrollHeight } = container;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      loadMoreSuggestUniverses();
    }
  }, [loadMoreSuggestUniverses]);

  const loadInitialData = useCallback(async () => {
    loadingRef.current = true;
    setLoading(true);
    setHasMore(true);
    hasMoreRef.current = true;
    pageRef.current = 1;

    try {
      const data = await public_getUniverse(1, PAGE_SIZE, null, null);
      setUniverses(data.universes);

      const more = data.universes.length === PAGE_SIZE;
      setHasMore(more);
      hasMoreRef.current = more;
    } catch (error) {
      setAlert("유니버스 조회 중 오류가 발생했습니다.");
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    resetUniverse();
    loadInitialData();
  }, [loadInitialData]);

  // 스크롤 이벤트 등록
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  // ResizeObserver로 layout 변경 시 높이 부족 체크
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const checkAndLoadMore = async () => {
      while (
        container.scrollHeight <= container.clientHeight &&
        hasMoreRef.current &&
        !loadingRef.current
      ) {
        await loadMoreSuggestUniverses();
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      checkAndLoadMore();
    });

    resizeObserver.observe(container);

    // 최초에도 체크
    checkAndLoadMore();

    return () => {
      resizeObserver.disconnect();
    };
  }, [loadMoreSuggestUniverses]);

  return (
    <PageLayout>
      <div
        className="w-full flex flex-col md:flex-row gap-1 p-3"
        style={{
          height: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
        }}
      >
        <div
          className="h-full overflow-y-auto"
          ref={scrollContainerRef}
          style={{ maxHeight: "100%" }}
        >
          <div className="w-[90%] sm:w-[70%] mx-auto">
            <div className="p-2 grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] sm:gap-20">
              {universes.map((universe, index) => (
                <div key={`${universe.id}-${index}`}>
                  <UniverseListItem
                    id={universe.id!}
                    thumbnailId={universe.thumbnailId}
                    title={universe.title}
                    author={universe.author}
                    view={universe.view}
                    createdTime={universe.createdTime}
                  />
                </div>
              ))}

              {alert && (
                <div className="col-span-2 flex justify-center py-4 text-red-500">
                  {alert}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
