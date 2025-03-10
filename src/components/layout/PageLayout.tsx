import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../../constants/componentSize";

// 사용된 페이지 - 퍼블릭 홈즈, 비즈니스, 어바웃, 컨텍트 페이지
export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full flex items-center flex-col bg-neutral-100"
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)` }}
    >
      {children}
    </div>
  );
}
