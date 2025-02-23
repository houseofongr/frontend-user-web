import { useEffect, useState } from "react";
import AccountTab from "../../../components/mypage/AccountTab";
import SoundsTab from "../../../components/mypage/SoundsTab";
import TabController from "../../../components/mypage/TabController";
import CustomerServiceTab from "../../../components/mypage/CustomerServiceTab";
import { useNavigate } from "react-router-dom";

const tabsData = [
  {
    label: "나의 계정",
    content: <AccountTab />,
  },
  {
    label: "나의 소리 기록실",

    content: <SoundsTab />,
  },
  {
    label: "고객센터",
    subTabs: [" •  1:1문의", " •  공지사항", " •  FAQ"],
    content: <CustomerServiceTab />,
  },
];

export default function Mypage() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="bg-neutral-100 h-screen">
      <div className="flex ">
        {/* 왼쪽 사이드 영역 */}
        <TabController activeTabIndex={activeTabIndex} onTabChange={setActiveTabIndex} />

        {/* 오른쪽 컨텐츠 영역 */}
        <div className="flex-1 p-8 flex flex-col ">
          {/* <span className="text-2xl">{tabsData[activeTabIndex].label}</span> */}
          <div>{tabsData[activeTabIndex].content}</div>
        </div>
      </div>
    </div>
  );
}
