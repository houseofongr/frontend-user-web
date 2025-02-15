import { useEffect, useState } from "react";
import API_CONFIG from "../config/api";
import { HomeListItem, UserMainHomeDetail } from "../types/home";
import SpinnerIcon from "../components/icons/SpinnerIcon";
import RenderImages from "../components/RenderImages";

import { useNavigate } from "react-router-dom";
import HeaderForDarkBackground from "../components/layout/HeaderForDarkBackground";
import UserHomesCarousel from "../components/UserHomesCarousel";

interface UserData {
  nickname: string;
}
export default function MainHome() {
  const [user, setUser] = useState<UserData | null>(null);
  const [homeData, setHomeData] = useState<UserMainHomeDetail | null>(null);
  const [homeList, setHomeList] = useState<HomeListItem[] | null>(null);
  const [selectedHomeId, setSelectedHomeId] = useState<number | null>(null);
  const [scale, setScale] = useState<number | null>(null);

  const navigate = useNavigate();

  const fetchHomeData = async (homeId: number) => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authentication token is missing");

      const response = await fetch(`${API_CONFIG.BACK_API}/homes/rooms?homeId=${homeId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch home details");

      const homeDetail = await response.json();

      setHomeData(homeDetail);
      setSelectedHomeId(homeId);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
          navigate("/login");
        }

        // 1. 유저 인증
        const userResponse = await fetch(`${API_CONFIG.BACK_API}/users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user info");
        }

        const userData = await userResponse.json();
        setUser(userData);

        // 2. 유저가 가지고있는 홈 목록 페치
        const homeResponse = await fetch(`${API_CONFIG.BACK_API}/homes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!homeResponse.ok) throw new Error("Failed to fetch home list");

        const homeListData = await homeResponse.json();

        if (!homeListData.homes.length) throw new Error("No homes available");
        setHomeList(homeListData.homes);

        const mainHomeId = homeListData.homes[0].id;

        setSelectedHomeId(mainHomeId);
        // 2. 홈 상세 fetch
        fetchHomeData(mainHomeId);
        setScale(window.innerWidth < window.innerHeight ? window.innerWidth / 5000 : window.innerHeight / 5000);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleHomeSelect = (homeId: number) => {
    if (homeId !== selectedHomeId) {
      fetchHomeData(homeId);
    }
  };

  if (!homeData || !scale || !user) return <SpinnerIcon />;
  return (
    <div className="w-full h-screen bg-stone-800">
      <HeaderForDarkBackground />
      <section className="flex flex-col items-center mt-10">
        <h1 className="inline bg-stone-700 px-4 py-2 text-gray-100">{homeData.homeName}</h1>
        {homeData && scale && selectedHomeId && (
          <RenderImages homeData={homeData} scale={scale} homeId={selectedHomeId} />
        )}
      </section>

      {/* 캐러셀 */}
      {homeList && homeList.length > 1 && (
        <div className="w-full flex-center flex-col pt-10 pb-15 bg-[#F5ECD5]">
          <span className="text-center font-bold">{user.nickname}님이 가지고 있는 홈 목록입니다.</span>
          <p>좌우로 움직여 메인으로 보여줄 나의 집을 설정해보세요!</p>
          <UserHomesCarousel slides={homeList} onHomeSelect={handleHomeSelect} selectedHomeId={selectedHomeId} />
        </div>
      )}
    </div>
  );
}
