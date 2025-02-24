import { Link, useLocation } from "react-router-dom";

const USER_TABS = [
  { label: "MY HOMES", href: "/main/home" },
  { label: "RESERVATION", href: "/reservation" },
  { label: "MY PAGE", href: "/mypage/account" },
  // 공통 메뉴
  { label: "ABOUT", href: "/about" },
  { label: "PROGRAM", href: "/program" },
  { label: "CONTACT", href: "/contact" },
];

const B2B_TABS = [
  { label: "CLIENT", href: "/public/client" },
  // 공통 메뉴
  { label: "ABOUT", href: "/public/about" },
  { label: "PROGRAM", href: "/public/program" },
  { label: "CONTACT", href: "/public/contact" },
];

const HIDE_LAYOUT_REGEX = /^\/main\/home(?:\/[^/]+\/rooms\/[^/]+)?$/;

export default function VerticalHeader() {
  const location = useLocation();
  const pathName = location.pathname;
  console.log("path", pathName);

  const shouldHideLayout = HIDE_LAYOUT_REGEX.test(pathName);

  const tabs = pathName.startsWith("/public") ? B2B_TABS : USER_TABS;

  return (
    <header className={`p-10 bg-stone-800 ${shouldHideLayout ? "hidden" : ""} `}>
      <Link to={"/"} className="flex flex-col items-center md:flex-row cursor-pointer  ">
        <img src={"/images/logo/logo_for-dark-bg.png"} alt="archive of ongr logo" width={65} height={65} />
      </Link>
      <ul className="flex flex-col gap-10 pt-20 text-white text-xs md:text-base  ">
        {tabs.map(({ label, href }) => {
          const isActive = pathName === href;
          return (
            <li key={label}>
              <Link to={href} className={`${isActive ? "font-normal  cursor-default" : "font-extralight"} `}>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
