import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PiHouseLine, PiUser, PiCalendarDots } from "react-icons/pi";
import Sidebar from "./Slidebar";
// import { AiOutlineMenu } from "react-icons/ai"; // 모바일 메뉴 아이콘

type Tab = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};
const TABS: Tab[] = [
  { label: "RESERVATION", href: "/reservation", icon: <PiCalendarDots size={30} /> },
  { label: "MY HOMES", href: "/main/home", icon: <PiHouseLine size={30} /> },
  { label: "MY PAGE", href: "/mypage/account", icon: <PiUser size={30} /> },
];

export default function HeaderForDarkBackground() {
  const location = useLocation();
  const pathName = location.pathname;
  const [isOpenSlider, setIsOpenSlider] = useState(false);

  return (
    <>
      <header className="w-full flex justify-between items-center fixed bg-transparent pt-5 md:pt-10 pl-5 md:pl-10 z-10 text-white">
        {/* 집 로고 이미지 */}
        {/* <Link to={"/"} className="flex flex-col items-center md:flex-row cursor-pointer ">
          <img src={"/images/logo/logo_for-dark-bg.png"} alt="archive of ongr logo" width={65} height={65} />
        </Link> */}
        <div className="w-1/3 flex">
          <span className="cursor-pointer text-lg" onClick={() => setIsOpenSlider(true)}>
            {/* <AiOutlineMenu size={25} /> // 모바일 */}
            MENU
          </span>
        </div>
        <ul className="flex gap-5 md:gap-10 text-xs md:text-base pr-5 md:pr-10">
          {TABS.map(({ label, href, icon }) => {
            const isActive = pathName === href;

            return (
              <li key={label}>
                <Link
                  to={href}
                  className={`flex-center flex-col gap-0.5 ${
                    isActive ? "hover:cursor-default text-primary" : "hover:cusor-pointer"
                  }`}
                >
                  <div>{icon}</div>
                  <span className={`hidden lg:inline text-xs ${isActive ? "font-normal " : "font-extralight "}`}>
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </header>
      <Sidebar isOpen={isOpenSlider} onClose={() => setIsOpenSlider(false)} />
    </>
  );
}
