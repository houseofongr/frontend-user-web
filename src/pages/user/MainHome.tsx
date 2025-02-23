import { useEffect, useState } from "react";
import SpinnerIcon from "../../components/icons/SpinnerIcon";
import RenderImages from "../../components/RenderImages";
import { useNavigate } from "react-router-dom";

import UserHomesCarousel from "../../components/UserHomesCarousel";
import { useUserData } from "../../hooks/useUserData";
import { useUserStore } from "../../stores/useUserStore";
import { useHomeList } from "../../hooks/useHomeList";
import { useHomeData } from "../../hooks/useHomeData";
import VerticalHeader from "../../components/layout/VerticalHeader";

export default function MainHome() {
  const [scale, setScale] = useState<number | null>(null);
  const [selectedHomeId, setSelectedHomeId] = useState<number | null>(null);
  const navigate = useNavigate();
  const { isLoading: userLoading, isError: userError } = useUserData();
  const { user } = useUserStore();
  const { data: homeList, isLoading: homeListLoading, isError: homeListError } = useHomeList();

  useEffect(() => {
    if (homeList && homeList.length > 0) {
      //  *todo : home data fetch 시 메인 홈 id 에 대한 값을 서버로 부터 받아서 fetch 해야함
      setSelectedHomeId(homeList[0].id);
    }
  }, [homeList]);

  const { data: homeData, isLoading: homeDataLoading, isError: homeDataError } = useHomeData(selectedHomeId || null);

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
  };

  if (userLoading || !user) return <SpinnerIcon />;
  if (userError) return <div>유저 정보를 불러올 수 없습니다.</div>;
  if (homeListLoading || !scale) return <SpinnerIcon />;
  if (homeListError) return <div>홈 목록을 불러올 수 없습니다.</div>;

  return (
    <div className="w-full h-screen bg-stone-800 flex">
      {/* <HeaderForDarkBackground /> */}
      <VerticalHeader />
      <section className="flex flex-col justify-center w-full items-center mt-10">
        {homeDataLoading ? (
          <SpinnerIcon />
        ) : homeDataError || !homeData ? (
          <div className="text-white">홈 데이터를 불러올 수 없습니다.</div>
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
