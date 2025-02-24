import clsx from "clsx";
import { useLocation } from "react-router-dom";

//1. ^\/main\/home → /main/home로 시작하는 경우
//2.  (?:\/[^/]+\/rooms\/[^/]+)? → "/무언가/rooms/무언가"는 선택적(?가 붙어있음), 즉 있어도 되고 없어도 됨.
// 아래의 두 경로에서 dark bg 적용
// <Route path="/main/home" element={<MainHome />} />
// <Route path="/main/home/:homeId/rooms/:roomId" element={<RoomDetailPage />} />
const SET_DARK_BG = /^\/main\/home(?:\/[^/]+\/rooms\/[^/]+)?$/;

export default function Footer() {
  const location = useLocation();
  const pathName = location.pathname;
  const hasDarkFooter = SET_DARK_BG.test(pathName);

  return (
    <footer
      className={clsx(
        "w-full flex flex-col md:flex-row justify-between sticky bottom-0 text-xs md:text-sm text-center font-light inset-x-0 py-2 ",
        { "bg-stone-800 text-white": hasDarkFooter }
      )}
    >
      {/* 기존 */}
      {/* <p>ARCHIVE OF ONGR Co.&copy; 2022 ALL RIGHT RESERVED.</p> */}
      {/* 올바른 저작권 표시법 ⓒ 2021.회사명 Co., Ltd. All rights reserved.*/}
      <div className="w-[200px]"></div>
      <p>&copy; 2022 ARCHIVE OF ONGR Co. ALL RIGHT RESERVED.</p>
      <div className="flex gap-5 md:pr-10 justify-evenly">
        <span>이용약관</span>
        <span>개인정보처리방침</span>
      </div>
    </footer>
  );
}
