import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { PiHouseLine, PiUser, PiCalendarDots } from "react-icons/pi";
import { useEffect, useState } from "react";
import Sidebar from "./Slidebar";

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

export default function Header() {
  const location = useLocation();
  const pathName = location.pathname;
  const [isOpenSlider, setIsOpenSlider] = useState(false);

  useEffect(() => {
    setIsOpenSlider(false);
  }, [location.pathname]);

  return (
    <>
      <header className="w-full flex justify-between items-center sticky top-0 p-4 md:p-10 bg-transparent z-10 border-b border-gray-200">
        <div className="w-1/3 flex justify-start">
          <span className="cursor-pointer text-xs md:text-lg" onClick={() => setIsOpenSlider(true)}>
            MENU
          </span>
        </div>
        <div className="w-1/3 flex justify-center">
          <Logo />
        </div>
        <ul className="w-1/3 flex justify-end gap-2 md:gap-10">
          {TABS.map(({ label, href, icon }) => {
            const isActive = pathName === href;
            return (
              <li key={label}>
                <Link
                  to={href}
                  className={`flex-center flex-col gap-0.5 ${
                    isActive ? "hover:cursor-default text-[#F5946D]" : "hover:cursor-pointer"
                  }`}
                >
                  <div>{icon}</div>
                  <span className={`hidden lg:inline text-xs ${isActive ? "font-normal" : "font-extralight"}`}>
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
