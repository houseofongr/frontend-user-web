import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { PiHouseLine, PiUser, PiCalendarDots } from "react-icons/pi";

// const TABS = [
//   // { label: "HOME", href: "/main/home" },
//   // { label: "MY PAGE", href: "/mypage/account" },
//   { label: "ABOUT", href: "/about" },
//   { label: "PROGRAM", href: "/program" },
//   { label: "CONTACT", href: "/contact" },
// ];

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

export default function Header() {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <header className="w-full flex justify-between items-center sticky top-0  md:py-10 sm:py-2  bg-transparent z-10 border-b border-gray-200 ">
      <div className="w-[350px] hidden md:flex "></div>
      <Logo />
      <ul className="pr-3 md:pr-10 flex gap-5 md:gap-10 text-sm md:text-base">
        {TABS.map(({ label, href, icon }) => {
          const isActive = pathName === href;
          return (
            // <li key={label}>
            //   <Link
            //     to={href}
            //     className={`${isActive ? "font-normal cursor-default" : "font-extralight"} hover:font-normal`}
            //   >
            //     {label}
            //   </Link>
            // </li>
            <li key={label}>
              <Link
                to={href}
                className={`flex-center flex-col gap-0.5 ${
                  isActive ? "hover:cursor-default text-[#F5946D]" : "hover:cusor-pointer"
                }`}
              >
                <div>{icon}</div>
                <span className={`hidden md:inline text-xs ${isActive ? "font-normal " : "font-extralight "}`}>
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
