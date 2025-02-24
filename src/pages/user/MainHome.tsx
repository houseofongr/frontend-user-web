import { useEffect, useState } from "react";
import SpinnerIcon from "../../components/icons/SpinnerIcon";
import RenderImages from "../../components/RenderImages";
import { useNavigate } from "react-router-dom";
import UserHomesCarousel from "../../components/UserHomesCarousel";
import { useUserData } from "../../hooks/useUserData";
import { useUserStore } from "../../stores/useUserStore";
import { useHomeList } from "../../hooks/useHomeList";
import { useHomeData } from "../../hooks/useHomeData";
import HeaderForDarkBackground from "../../components/common/HeaderForDarkBackground";
import { HomeListItem } from "../../types/home";
import API_CONFIG from "../../config/api";
import { DEFAULT_HOME_ID_FOR_USER_WITHOUT_HOME } from "../../constants/defaultHomeId";

export default function MainHome() {
  const [scale, setScale] = useState<number | null>(null);
  const [selectedHomeId, setSelectedHomeId] = useState<number | null>(null);
  const navigate = useNavigate();
  const { isLoading: userLoading, isError: userError } = useUserData();
  const { user } = useUserStore();
  const { data: homeList, isLoading: homeListLoading, isError: homeListError } = useHomeList();
  const { homeData, isLoading: homeDataLoading, isFetching, updateMainHome, isPending } = useHomeData(selectedHomeId);

  useEffect(() => {
    if (homeList && homeList.length > 0) {
      const mainHome = homeList.find((home: HomeListItem) => home.isMain);
      setSelectedHomeId(mainHome.id);
    }
  }, [homeList]);

  useEffect(() => {
    setScale(window.innerWidth < window.innerHeight ? window.innerWidth / 5000 : window.innerHeight / 5000);
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleHomeSelect = (homeId: number) => {
    setSelectedHomeId(homeId);
    updateMainHome(homeId);
  };

  if (userLoading || !user) return <SpinnerIcon />;
  if (userError) return <div>유저 정보를 불러올 수 없습니다.</div>;
  if (homeListLoading || !scale) return <SpinnerIcon />;
  if (homeListError) return <div>홈 목록을 불러올 수 없습니다.</div>;

  return (
    <div className="w-full h-screen bg-stone-800 flex">
      <HeaderForDarkBackground />
      <section className="flex flex-col justify-center w-full items-center mt-10">
        {homeDataLoading || isFetching || isPending ? (
          <SpinnerIcon />
        ) : !homeData ? (
          <div className="text-center">
            {/* 보유한 홈이 없을 경우 보여줘야할 기본 홈 이미지 */}
            <p className="inline bg-stone-700 px-4 py-2 text-gray-100">
              {user.nickname}님, 보유중인 하우스가 존재하지 않습니다.
            </p>
            <img
              alt="default-home-image"
              width={window.innerHeight}
              height={window.innerHeight}
              src={`${API_CONFIG.PRIVATE_IMAGE_LOAD_API}/${DEFAULT_HOME_ID_FOR_USER_WITHOUT_HOME}`}
            />
          </div>
        ) : (
          <div className="w-full text-center">
            <div className="min-h-full">
              {homeData && (
                <>
                  {/* <h1 className="inline bg-stone-700 px-4 py-2 text-gray-100">{homeData.homeName}</h1> */}
                  <RenderImages homeId={selectedHomeId!} scale={scale} homeData={homeData} />
                </>
              )}
            </div>
            {/* 캐러셀 */}
            {homeList && homeList.length > 1 && (
              <div className="w-full flex-center flex-col pt-10 pb-15 ">
                <span className="text-center font-bold text-white">{user.nickname}님이 가지고 있는 홈 목록입니다.</span>
                <p className="text-white">좌우로 움직여 메인으로 보여줄 나의 집을 설정해보세요!</p>
                <UserHomesCarousel slides={homeList} onHomeSelect={handleHomeSelect} selectedHomeId={selectedHomeId} />
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
