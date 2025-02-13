import { useState } from "react";

const tabsData = [
  {
    label: "계정 관리",
    content: "계정 관리 탭에서는 닉네임 변경, 회원 탈퇴, 메인 홈 설정, 유저의 홈 네임 설정 가능합니다.", // * todo : React.ReactNode로 변경
  },
  {
    label: "나의 음원",
    content: "음원의 경로를 보여주고 해당 음원 선택시 방으로 이동합니다.",
  },
  {
    label: "나의 예약",
    content: "나의 예약 현황을 조회하고, 새로운 예약을 할 수 있는 양식을 제공합니다..",
  },
];

export function Tabs() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div className="flex h-screen">
      {/* 왼쪽 탭 영역 */}
      <div className="w-1/6 flex flex-col border-r-2 border-gray-100">
        {tabsData.map((tab, idx) => (
          <button
            key={idx}
            className={`py-4 px-6 text-left transition-colors duration-300 ${
              idx === activeTabIndex ? "bg-[#F5946D] text-white f=s " : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTabIndex(idx)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 오른쪽 컨텐츠 영역 */}
      <div className="flex-1 p-8 bg-neutral-100">
        <h1 className="font-extrabold text-2xl mb-4">{tabsData[activeTabIndex].label}</h1>
        <p>{tabsData[activeTabIndex].content}</p>
      </div>
    </div>
  );
}
