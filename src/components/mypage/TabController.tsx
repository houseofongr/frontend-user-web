import { Link } from "react-router-dom";

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

type TabControllerProps = {
  activeTabIndex: number;
  onTabChange?: (index: number) => void;
};

export default function TabController({ activeTabIndex }: TabControllerProps) {
  return (
    <aside className="lg:min-w-[240px] bg-white">
      <ul className="flex flex-row lg:flex-col ">
        {TABS.map((tab, idx) => (
          <li
            key={tab.label}
            className={`w-full text-sm md:text-lg lg:p-10 lg:flex  ${idx === activeTabIndex ? "bg-neutral-100 " : ""}`}
          >
            <Link to={tab.path}>
              <div
                className={`w-full text-center  lg:text-left py-3 lg transition-colors duration-300 cursor-pointer ${
                  idx === activeTabIndex ? "" : "hover:font-base font-extralight"
                }`}
              >
                {tab.label}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
