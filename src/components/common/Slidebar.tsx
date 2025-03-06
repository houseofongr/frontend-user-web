import { Link, useLocation } from "react-router-dom";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};
type Tab = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

const TABS: Tab[] = [
  { label: "HOMES", href: "/common/homes" },
  { label: "BUSINESS", href: "/common/business" },
  { label: "ABOUT", href: "/about" },
  { label: "PROGRAM", href: "/program" },
  { label: "CONTACT", href: "/contact" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-10 " onClick={onClose}></div>}
      <div
        className={`fixed top-0 left-0 h-full w-44 md:w-64 bg-white shadow-md border border-r border-gray-200 z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 md:p-10 flex justify-between items-center h-[50px] md:h-[140px] mb-5 md:mb-0">
          <span className="text-primary text-xs md:text-lg">MENU</span>
        </div>

        <nav className="px-10 md:px-20">
          <Link to={"/"} className="flex-center cursor-pointer mb-10  w-3/5" onClick={onClose}>
            <img src={"/images/logo/logo_for-dark-bg.png"} alt="archive of ongr logo" width={70} height={65} />
          </Link>
          <ul className="flex flex-col gap-10 text-sm md:text-base">
            {TABS.map(({ label, href }) => {
              const isActive = pathName === href;
              return (
                <li key={label} className={`${label === "BUSINESS" ? "pb-10 md:pb-14" : ""}`}>
                  <Link
                    to={href}
                    className={`block  ${
                      isActive ? "text-[#F5946D] font-medium cursor-default" : "hover:text-gray-500"
                    }`}
                    onClick={onClose}
                  >
                    <span className={` ${isActive ? "font-bold " : "font-normal"}`}>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
