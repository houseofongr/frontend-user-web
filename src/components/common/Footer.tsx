import clsx from "clsx";
import { useLocation } from "react-router-dom";
import MarkdownModal from "../modal/MarkdownModal";
import { useState } from "react";

//1. ^\/main\/home → /main/home로 시작하는 경우
//2.  (?:\/[^/]+\/rooms\/[^/]+)? → "/무언가/rooms/무언가"는 선택적(?가 붙어있음), 즉 있어도 되고 없어도 됨.
// 아래의 두 경로에서 dark bg 적용
// <Route path="/main/home" element={<MainHome />} />
// <Route path="/main/home/:homeId/rooms/:roomId" element={<RoomDetailPage />} />
//  <Route path="/common/homes/1/demo" element={<DemoPage />} />;
const SET_DARK_BG = /^\/main\/home(?:\/[^/]+\/rooms\/[^/]+)?$|^\/common\/homes\/1\/demo$/;

export default function Footer() {
  const location = useLocation();
  const pathName = location.pathname;
  const hasDarkFooter = SET_DARK_BG.test(pathName);

  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <>
      <footer
        className={clsx(
          "w-full flex flex-col md:flex-row justify-between sticky bottom-0 text-xs md:text-sm text-center font-light inset-x-0 py-2 ",
          { "bg-stone-800 text-white": hasDarkFooter }
        )}
      >
        <div className="w-[200px]"></div>
        <p>&copy; 2022 ARCHIVE OF ONGR Co. ALL RIGHT RESERVED.</p>
        <div className="flex gap-5 md:pr-10 justify-evenly">
          <span className="cursor-pointer hover:underline" onClick={() => setIsTermsOpen(true)}>
            이용약관
          </span>
          <span className="cursor-pointer hover:underline" onClick={() => setIsPrivacyOpen(true)}>
            개인정보처리방침
          </span>
        </div>
      </footer>

      <MarkdownModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        title="이용약관"
        filePath="/docs/terms-of-service.md"
      />

      <MarkdownModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        title="개인정보처리방침"
        filePath="/docs/privacy-policy.md"
      />
    </>
  );
}
