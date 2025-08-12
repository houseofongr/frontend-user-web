import { useEffect, useRef, useState, useCallback } from "react";
import PageLayout from "../../components/layout/PageLayout";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../../constants/size";
import { UniverseInfoType } from "../../types/universe";
import UniverseListItem from "./detail/UniverseListItem";
import {
  public_getUniverse,
  SearchType,
} from "../../service/user_universeService";
import { useUniverseStore } from "../../hooks/admin/useUniverseStore";
import SearchComponent from "../../components/SearchComponent";

const PAGE_SIZE = 4;

export default function UniverseListPage() {
  const { resetUniverseStore: resetUniverse } = useUniverseStore();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [universes, setUniverses] = useState<UniverseInfoType[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [alert, setAlert] = useState("");

  const [searchFilter, setSearchFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const pageRef = useRef(1);

  // 📌 데이터 불러오기
  const loadMoreUniverses = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;
    if (!hasMore) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const nextPage = pageRef.current + 1;
      const data = await public_getUniverse(nextPage, PAGE_SIZE);

      console.log(data);

      setUniverses((prev) => [...prev, ...data.universes]);
      pageRef.current = nextPage;

      const more = data.universes.length === PAGE_SIZE;
      setHasMore(more);
      hasMoreRef.current = more;
    } catch {
      setAlert("유니버스 추가 조회 중 오류가 발생했습니다.");
      setHasMore(false);
      hasMoreRef.current = false;
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [searchFilter, searchQuery]);

  // 📌 공통 로딩 조건 체크 함수
  const checkAndLoadMore = useCallback(async () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    while (
      container.scrollHeight <= container.clientHeight &&
      hasMoreRef.current &&
      !loadingRef.current
    ) {
      await loadMoreUniverses();
    }
  }, [loadMoreUniverses]);

  // 📌 최초 로딩
  const loadInitialData = useCallback(
    async (
      filter: string | null = searchFilter,
      query: string | null = searchQuery
    ) => {
      loadingRef.current = true;
      setLoading(true);
      setHasMore(true);
      hasMoreRef.current = true;
      pageRef.current = 1;

      try {
        const data = await public_getUniverse(1, PAGE_SIZE);
        setUniverses(data.universes);

        const more = data.universes.length === PAGE_SIZE;
        setHasMore(more);
        hasMoreRef.current = more;
      } catch {
        setAlert("유니버스 조회 중 오류가 발생했습니다.");
        setHasMore(false);
        hasMoreRef.current = false;
      } finally {
        loadingRef.current = false;
        setLoading(false);

        // ✅ 데이터 로드 후 화면 채우기 체크
        setTimeout(() => {
          checkAndLoadMore();
        }, 0);
      }
    },
    [searchFilter, searchQuery, checkAndLoadMore]
  );

  // 📌 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container || loadingRef.current || !hasMoreRef.current) return;

    const { scrollTop, clientHeight, scrollHeight } = container;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      loadMoreUniverses();
    }
  }, [loadMoreUniverses]);

  // ✅ 초기화 + 첫 로딩
  useEffect(() => {
    resetUniverse();
    loadInitialData();
  }, [loadInitialData]);

  // ✅ 스크롤 이벤트 바인딩
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // ✅ ResizeObserver로 높이 부족 시 자동 로딩
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      checkAndLoadMore();
    });

    resizeObserver.observe(container);
    checkAndLoadMore(); // 초기 체크

    return () => resizeObserver.disconnect();
  }, [checkAndLoadMore]);

  const handleSearch = useCallback((filter: string, query: string) => {
    setSearchFilter(filter);
    setSearchQuery(query.trim() === "" ? null : query.trim());
    pageRef.current = 1;
    setUniverses([]);
    loadInitialData(
      filter === "ALL" ? null : filter,
      query.trim() === "" ? null : query.trim()
    );
  }, []);

  return (
    <PageLayout>
      <div className="w-full flex items-center flex-col gap-5 sm:p-5 pt-5">
        <SearchComponent
          onSearch={handleSearch}
          placeholder="유니버스 검색하기"
          options={[
            { value: "ALL", label: SearchType.ALL },
            { value: "CONTENT", label: SearchType.CONTENT },
            { value: "AUTHOR", label: SearchType.AUTHOR },
          ]}
        />
        <div
          className="w-full flex flex-col md:flex-row gap-1 p-3"
          style={{
            height: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
          }}
        >
          <div
            ref={scrollContainerRef}
            className="h-full overflow-y-auto"
            style={{ maxHeight: "100%" }}
          >
            <div className="w-[90%] sm:w-[80%] mx-auto">
              <div className="p-2 gap-5 grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] sm:gap-20">
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
      </div>
    </PageLayout>
  );
}
