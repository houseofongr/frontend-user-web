import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../../constants/size";
import { Link } from "react-router-dom";
import InitHouseImage from "../../components/InitHouseImage";

export default function ForbiddenPage() {
  return (
    <div
      className="h-full flex flex-col flex-center lg:flex-row gap-10 lg:gap-15  md:text-left md:pb-20 lg:pb-10"
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)` }}
    >
      <div>
        <div className="text-7xl md:text-8xl font-bold mb-2 text-center lg:text-start">403</div>
        <p className="text-[15px] md:text-lg pb-5  font-extralight text-center">
          잠시만요, 접근할 수 없는 페이지를 요청하셨습니다.
        </p>
        <div className="text-center lg:text-start text-sm md:text-base font-extralight">
          <p> 이 방의 문을 열 수 있는 권한이 없습니다!✋🏻</p>
          <p>홈으로 돌아가서 다른 방을 살펴보세요. </p>
        </div>
      </div>

      <Link to="/">
        <InitHouseImage imgType="private" />
        <span className="text-xs block mt-2 text-center">홈으로 이동</span>
      </Link>
    </div>
  );
}
