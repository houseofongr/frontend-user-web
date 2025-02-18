import { Link, useLocation } from "react-router-dom";
const TABS = [
  { label: "홈", href: "/main/home" },
  { label: "마이페이지", href: "/mypage" },
  { label: "소개", href: "/about" },
];

export default function HeaderForDarkBackground() {
  const location = useLocation();
  const pathName = location.pathname;
  return (
    <header className="w-full flex justify-between items-center fixed bg-transparent z-2  pt-10 pl-10 ">
      <Link to={"/"} className="flex flex-col items-center md:flex-row cursor-pointer ">
        <img src={"/images/logo/logo_for-dark-bg.png"} alt="archive of ongr logo" width={65} height={65} />
      </Link>
      <ul className="flex gap-10 text-white text-xs md:text-base pr-10">
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
