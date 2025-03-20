import { useEffect, useState } from "react";
import TabController from "../mypage/TabController";
import { useLocation } from "react-router-dom";

const TABS = [
  {
    label: "나의 계정",
    subTabs: ["회원정보", "보유 홈 목록"],
    path: "/mypage/account",
  },
  {
    label: "소리 모음",
    subTabs: ["소리 모음"],
    path: "/mypage/sound-list",
  },

  {
    label: "고객지원",
    subTabs: ["1:1 문의", "공지사항", "FAQ"],
    path: "/mypage/cscenter",
  },
];

export default function MypageLayout({ children }: { children: React.ReactNode }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const location = useLocation();

  // 현재 경로를 기반으로 activeTabIndex 설정
  useEffect(() => {
    const currentIndex = TABS.findIndex((tab) => location.pathname.includes(tab.path));
    setActiveTabIndex(currentIndex !== -1 ? currentIndex : 0);
  }, [location.pathname]);

  return (
    <div className="bg-neutral-100 h-screen border-b border-gray-200">
      <div className="flex flex-col lg:flex-row ">
        <TabController activeTabIndex={activeTabIndex} onTabChange={setActiveTabIndex} />

        {/* 오른쪽 컨텐츠 영역 */}
        <div className="flex-1 p-8 md:p-10 flex flex-col">{children}</div>
      </div>
    </div>
  );
}
