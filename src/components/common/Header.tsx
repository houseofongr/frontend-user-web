import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { PiHouseLine, PiUser, PiCalendarDots } from "react-icons/pi";
import { useEffect, useState } from "react";
import Sidebar from "./Slidebar";
import { AiOutlineMenu } from "react-icons/ai";

type Tab = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

const TABS: Tab[] = [
  { label: "RESERVATION", href: "/reservation", icon: <PiCalendarDots className="text-xl md:text-3xl" /> },
  { label: "MY HOMES", href: "/main/home", icon: <PiHouseLine className="text-xl md:text-3xl" /> },
  { label: "MY PAGE", href: "/mypage/account", icon: <PiUser className="text-xl md:text-3xl" /> },
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
        <div className="w-1/3">
          <span className="cursor-pointer lg:hidden" onClick={() => setIsOpenSlider(true)}>
            <AiOutlineMenu className="text-xl md:text-3xl" />
          </span>
          <span className="cursor-pointer hidden lg:block lg:text-lg" onClick={() => setIsOpenSlider(true)}>
            MENU
          </span>
        </div>
        <div className="w-1/3 flex justify-center">
          <Logo />
        </div>
        <ul className="w-1/3 flex justify-end gap-3 md:gap-8">
          {TABS.map(({ label, href, icon }) => {
            let isActive = pathName === href;
            if (href.startsWith("/mypage") && pathName.startsWith("/mypage")) {
              isActive = true;
            }

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
