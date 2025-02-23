import { Link, useLocation } from "react-router-dom";

const TABS = [
  { label: "MY HOMES", href: "/main/home" },
  { label: "RESERVATION", href: "/reservation" },
  { label: "MY PAGE", href: "/mypage/account" },
  { label: "ABOUT", href: "/about" },
  { label: "PROGRAM", href: "/program" },
  { label: "CONTACT", href: "/contact" },
];

export default function VerticalHeader() {
  const location = useLocation();
  const pathName = location.pathname;
  return (
    <header className=" p-10  ">
      <Link to={"/"} className="flex flex-col items-center md:flex-row cursor-pointer  ">
        <img src={"/images/logo/logo_for-dark-bg.png"} alt="archive of ongr logo" width={65} height={65} />
      </Link>
      <ul className="flex flex-col gap-10 pt-20 text-white text-xs md:text-base  ">
        {TABS.map(({ label, href }) => {
          const isActive = pathName === href;
          return (
            <li key={label}>
              <Link
                to={href}
                className={`${isActive ? "font-normal  cursor-default" : "font-extralight"} hover:font-normal`}
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
