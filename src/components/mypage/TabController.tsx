import AccountTab from "./AccountTab";
import CustomerServiceTab from "./CustomerServiceTab";
import SoundsTab from "./SoundsTab";

const TABS = [
  {
    label: "나의 계정",
    subTabs: ["회원정보", "보유 홈 목록"],
    content: <AccountTab />,
  },
  {
    label: "나의 소리 기록실",
    subTabs: ["나의 소리 모음"],
    content: <SoundsTab />,
  },

  {
    label: "고객지원",
    subTabs: ["1:1 문의", "공지사항", "FAQ"],
    content: <CustomerServiceTab />,
  },
];

type TabControllerProps = {
  activeTabIndex: number;
  onTabChange: (index: number) => void;
};

export default function TabController({ activeTabIndex, onTabChange }: TabControllerProps) {
  return (
    <aside className="min-w-[240px] border-rborder-gray-200">
      <ul className=" flex flex-col gap-10 px-10 py-15">
        {TABS.map((tab, idx) => (
          <li key={tab.label} className="w-full ">
            <button
              key={idx}
              type="button"
              className={`w-full text-left transition-colors duration-300 cursor-pointer ${
                idx === activeTabIndex ? "text-stone-800" : "hover:bg-gray-200"
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
