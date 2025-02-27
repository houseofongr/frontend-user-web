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
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";

export default function MyHomesPage() {
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
      console.log("main home", mainHome);

      if (mainHome) {
        console.log("홈도 있고 메인홈 설정도 되어있음", mainHome);
        setSelectedHomeId(mainHome.id);
      } else {
        console.log("홈은 있지만 메인홈 설정은 안되어있음", mainHome);
        console.log(homeList);
        setSelectedHomeId(homeList[0].basicImageId);
      }
    } else {
      console.log("보유한 홈이 없음", homeList);
      setSelectedHomeId(null);
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

  const hasHomes = homeList && homeList.length > 0;
  const hasMainHome = homeList?.some((home: HomeListItem) => home.isMain);
  const showDefaultHome = !hasMainHome; // 메인 홈이 없으면 기본 이미지 표시

  if (userLoading || !user) return <SpinnerIcon />;
  if (userError) return <div>유저 정보를 불러올 수 없습니다.</div>;
  if (homeListLoading || !scale) return <SpinnerIcon />;
  if (homeListError) return <div>홈 목록을 불러올 수 없습니다.</div>;

  return (
    <div className="w-full flex flex-col bg-stone-800 pb-10">
      <HeaderForDarkBackground />
      <section className="mt-10 flex-center min-h-screen">
        {homeDataLoading || isFetching || isPending ? (
          <SpinnerIcon />
        ) : showDefaultHome ? (
          <div className="text-center">
            {/* 보유한 홈이 없을 경우 보여줘야할 기본 홈 이미지 */}
            <p className="inline bg-stone-700 px-4 py-2 text-gray-100">
              {user.nickname}님, 보유중인 하우스가 존재하지 않거나 메인 하우스 설정을 아직 하지 않았습니다.
            </p>
            <img
              alt="default-home-image"
              width={window.innerHeight}
              height={window.innerHeight}
              src={`${API_CONFIG.PRIVATE_IMAGE_LOAD_API}/${DEFAULT_HOME_ID_FOR_USER_WITHOUT_HOME}`}
            />
          </div>
        ) : (
          <div className="w-full h-full">
            {homeData && <RenderImages homeId={selectedHomeId!} scale={scale} homeData={homeData} />}
          </div>
        )}
      </section>

      <div className="w-full flex-center flex-col pt-10">
        {hasHomes && homeList.length > 1 && (
          <>
            <span className="text-center font-bold text-white">{user.nickname}님이 가지고 있는 홈 목록입니다.</span>
            <p className="text-white">좌우로 움직여 메인으로 보여줄 나의 집을 설정해보세요!</p>
            <UserHomesCarousel slides={homeList} onHomeSelect={handleHomeSelect} selectedHomeId={selectedHomeId} />
          </>
        )}

        {/* 보유한 홈이 1개이면서 - 메인홈 설정이 있는경우 ||  메인홈 설정이 없는경우 */}
        {hasHomes && homeList.length === 1 && (
          <>
            <span className="text-center font-bold text-white">{user.nickname}님이 가지고 있는 홈 목록입니다.</span>
            <p className="text-center  text-white mb-10">
              {hasMainHome ? "현재 메인 홈으로 설정된 하우스입니다." : "메인 홈으로 설정하여 방으로 이동해보세요!"}
            </p>
            <div className="flex flex-col outline-none relative">
              {!hasMainHome && (
                <div className="absolute">
                  <button onClick={() => updateMainHome(selectedHomeId!)}>
                    <MdOutlineRadioButtonUnchecked size={20} className="text-gray-500 cursor-pointer" />
                  </button>
                </div>
              )}

              <img
                alt={"default-home-img"}
                width={220}
                height={220}
                className="object-contain outline-none"
                src={`${API_CONFIG.PRIVATE_IMAGE_LOAD_API}/${selectedHomeId}`}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

{
  /* {hasHomes && (
        <div className="w-full flex-center flex-col">
          <span className="text-center font-bold text-white">{user.nickname}님이 가지고 있는 홈 목록입니다.</span>

          {homeList.length === 1 ? (
            <p className="text-white">보유중인 하우스가 1개 존재합니다. 메인 하우스로 설정하여 방으로 이동해보세요!</p>
          ) : (
            //  홈개수 2개부터
            <p className="text-white">좌우로 움직여 메인으로 보여줄 나의 집을 설정해보세요!</p>
          )}
          <UserHomesCarousel slides={homeList} onHomeSelect={handleHomeSelect} selectedHomeId={selectedHomeId} />
        </div>
      )} */
}
