import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="w-full flex justify-between items-center fixed top-0 right-11 inset-x-0 md:py-8 sm:py-2 bg-transparent z-10 ">
      <div className="invisible w-[150px]"></div>
      <Logo />
      <div className="pr-10 flex gap-4 text-white">
        <button
          onClick={() => {
            navigate("/mypage");
          }}
          type="button"
        >
          마이페이지
        </button>
        <button
          onClick={() => {
            navigate("/main/home");
          }}
          type="button"
        >
          메인
        </button>
      </div>
    </header>
  );
}
