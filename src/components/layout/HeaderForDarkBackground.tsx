import { Link, useNavigate } from "react-router-dom";

export default function HeaderForDarkBackground() {
  const navigate = useNavigate();
  return (
    <header className="w-full flex justify-between items-center fixed bg-transparent z-2  pt-10 pl-10 ">
      <Link to={"/"} className="flex flex-col items-center md:flex-row cursor-pointer ">
        <img src={"/images/logo/logo_for-dark-bg.png"} alt="archive of ongr logo" width={65} height={65} />
      </Link>
      <div className="flex gap-10 text-white text-xs md:text-base pr-10">
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
