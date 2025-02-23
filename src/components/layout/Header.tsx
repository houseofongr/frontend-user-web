import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

const TABS = [
  { label: "홈", href: "/main/home" },
  { label: "마이페이지", href: "/mypage/account" },
  { label: "소개", href: "/about" },
];

export default function Header() {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <header className="w-full flex justify-between items-center sticky top-0  md:py-10 sm:py-2  bg-transparent z-10 border-b border-gray-200 ">
      <div className="w-[250px] hidden md:flex "></div>
      <Logo />
      <ul className="pr-10 flex gap-5 md:gap-10 text-sm md:text-base">
        {TABS.map(({ label, href }) => {
          const isActive = pathName === href;
          return (
            <li key={label}>
              <Link
                to={href}
                className={`${isActive ? "font-normal cursor-default" : "font-extralight"} hover:font-normal`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
