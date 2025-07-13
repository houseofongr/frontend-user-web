import { useEffect, useState } from "react";
import PageLayout from "../../components/layout/PageLayout";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../../constants/size";
import { usePieceStore } from "../../hooks/admin/usePieceStore";
import { useSpaceStore } from "../../hooks/admin/useSpaceStore";
import { UniverseType, useUniverseStore } from "../../hooks/admin/useUniverseStore";
import SpaceSelector from "./SpaceSelector";
import ModalAlertMessage from "../../components/modal/ModalAlertMessage";
import { getUniverseTree } from "../../service/universeService";
import UniverseDetailInfo from "./detail/UniverseDetailInfo";


export default function UniverseDetailPage() {
  const {
    universeId,
    activeInnerImageId,
    rootUniverse,
    setUniverseId,
    setRootUniverse,
    setUniverseData,
    setRootUniverseInnerImageId,
    setActiveInnerImageId,
    refreshUniverseData,
  } = useUniverseStore();

  const {
    currentSpaceId,
    currentSpace,
    getSpaceById,
    setCurrentSpaceId,
    setCurrentSpace,
    setParentSpaceId,
  } = useSpaceStore();

  const { currentPiece, setCurrentPiece } = usePieceStore();

  const [innerImg, setInnerImg] = useState<File | null>(null);
  const [alert, setAlert] = useState<string>("");

  // currentSpaceId 변경 시마다 화면 데이터 설정
  useEffect(() => {
    console.log(rootUniverse);

    if (rootUniverse == null) {
      loadInitialData(null);
      return;
    }

    if (currentSpaceId === -1) {
      setUniverseData(
        rootUniverse.innerImageId,
        rootUniverse.spaces,
        rootUniverse.pieces
      );
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

  // 초기 데이터 로딩 함수
  const loadInitialData = async (spaceID: number | null) => {
    try {
      setUniverseId(26);
      if (universeId == null) return;

      const data: UniverseType = await getUniverseTree(universeId); // 0 또는 특정 유니버스 ID
      if (spaceID == null) {
        setRootUniverse(data);
        setUniverseData(data.innerImageId, data.spaces, data.pieces);
        setCurrentSpaceId(-1);
        setCurrentSpace(null);
        setParentSpaceId(-1);
      } else {
        setRootUniverse(data);
        const space = getSpaceById(spaceID);
        if (space != null) {
          setUniverseData(space.innerImageId, space.spaces, space.pieces);
        }
      }

      console.log(data);


    } catch (error: any) {
      setAlert("유니버스 조회 중 오류가 발생했습니다.");
    }
  };



  return (
    <PageLayout>
      {alert && (
        <ModalAlertMessage onClose={() => setAlert("")}>
          안내
        </ModalAlertMessage>
      )}
      <div className="w-full flex flex-col md:flex-row gap-1 p-1"
        style={{ height: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)` }}
      >
        {/* 스페이스 영역 */}
        <div className="w-full md:w-2/3 aspect-square bg-black rounded-[10px]">
          <div className="flex items-center justify-center h-full">
            <SpaceSelector
              innerImageId={activeInnerImageId}
            />
          </div>
        </div>

        {/* 오른쪽 영역 */}
        <div className="w-full md:w-1/3 flex flex-col gap-1">
          {/* 상단 2/5 */}
          <div className="h-40 md:h-2/5 flex items-center justify-center border-1">
            <UniverseDetailInfo />
          </div>
          {/* 하단 3/5 */}
          <div className="flex-1 flex items-center justify-center border-1">
            Right Bottom (3/5)
          </div>
        </div>
      </div>
    </PageLayout>
  );
}