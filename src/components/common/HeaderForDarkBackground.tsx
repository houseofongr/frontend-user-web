import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PiHouseLine, PiUser, PiCalendarDots } from "react-icons/pi";
import Sidebar from "./Slidebar";
import { AiOutlineMenu } from "react-icons/ai";

type Tab = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};
const TABS: Tab[] = [
  { label: "RESERVATION", href: "/reservation", icon: <PiCalendarDots className="text-xl md:text-4xl" /> },
  { label: "MY HOMES", href: "/main/home", icon: <PiHouseLine className="text-xl md:text-4xl" /> },
  { label: "MY PAGE", href: "/mypage/account", icon: <PiUser className="text-xl md:text-4xl" /> },
];

export default function HeaderForDarkBackground() {
  const location = useLocation();
  const pathName = location.pathname;
  const [isOpenSlider, setIsOpenSlider] = useState(false);

  return (
    <>
      <header className="w-full flex justify-between items-center fixed bg-transparent p-4 md:p-10 pl-5 md:pl-10 z-10 text-white">
        <div className="w-1/3 flex">
          <span className="cursor-pointer lg:hidden" onClick={() => setIsOpenSlider(true)}>
            <AiOutlineMenu className="text-xl md:text-4xl" />
          </span>

          <span className="cursor-pointer hidden lg:block lg:text-lg" onClick={() => setIsOpenSlider(true)}>
            MENU
          </span>
        </div>
        <ul className="flex gap-4 md:gap-10">
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
      {isOpenSlider && <Sidebar isOpen={isOpenSlider} onClose={() => setIsOpenSlider(false)} />}
    </>
  );
}
