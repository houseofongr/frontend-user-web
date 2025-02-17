import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="w-full flex justify-between items-center fixed  md:py-10 sm:py-2  bg-transparent z-10 ">
      <div className="w-[250px]"></div>
      <Logo />
      <div className="pr-10 flex gap-10 text-xs md:text-base">
        <button
          onClick={() => {
            navigate("/main/home");
          }}
          type="button"
        >
          메인
        </button>
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
            navigate("/about");
          }}
          type="button"
        >
          소개
        </button>
      </div>
    </header>
  );
}
