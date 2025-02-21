import AccountTab from "./AccountTab";
import SoundsTab from "./SoundsTab";
import ReservationTab from "./ReservationTab";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../../constants/componentSize";

const TABS = [
  {
    label: "나의 계정",
    subTabs: [" 회원정보", "보유 홈 목록"],
    content: <AccountTab />,
  },
  {
    label: "나의 소리 기록실",
    subTabs: ["나의 소리 모음"],
    content: <SoundsTab />,
  },
  {
    label: "나의 예약",
    subTabs: ["예약 조회", "새로운 예약"],
    content: <ReservationTab />,
  },
  //   {
  //     label: "고객지원",
  //     subTabs: ["1:1 문의", "공지사항", "FAQ"],
  //     content: <ReservationTab />,
  //   },
];

type TabControllerProps = {
  activeTabIndex: number;
  onTabChange: (index: number) => void;
};

export default function TabController({ activeTabIndex, onTabChange }: TabControllerProps) {
  return (
    <aside
      className="min-w-[240px] border-r border-gray-200"
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)` }}
    >
      <ul className=" flex flex-col gap-10 p-10 ">
        {TABS.map((tab, idx) => (
          <li key={tab.label} className="w-full ">
            <button
              key={idx}
              type="button"
              className={`w-full text-left transition-colors duration-300 font-bold ${
                idx === activeTabIndex ? " text-stone-800" : "hover:bg-gray-100"
              }`}
              onClick={() => onTabChange(idx)}
            >
              {tab.label}
            </button>

            <div className="text-gray-400 flex flex-col gap-2 mt-3">
              {tab.subTabs.map((subTab) => (
                <p key={subTab}>{subTab}</p>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
