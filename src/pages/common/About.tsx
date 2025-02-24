import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../../constants/componentSize";

export default function AboutPage() {
  return (
    <section
      className="flex-center text-[15px] leading-7"
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)` }}
    >
      <div className="">
        <p>
          <strong>아카이브 오브 옹알</strong>은
        </p>
        <p>「기억을 가장 생생하게 기록하는 방법은 소리다」 라는 생각을 시작으로</p>
        <p>개인의 일상을 소리로 포착하고 적재하기 위해 만들어졌습니다.</p>
        <br />
        <br />

        <p>소리를 통해 나를 기록하고</p>
        <p>그 기록이 또 다른 누군가에게 오랜 기억의 저장고가 될 수 있도록 돕는 </p>
        <p>[소리 채록] 프로그램과</p>
        <br />

        <p>채록된 소리를 안전하게 장기적으로 보존하는</p>
        <p>디지털 아카이브 클라우드 플랫폼을 개발하고 운영 합니다.</p>
        <br />
        <br />

        <p>시간을 담는 소리의 집,</p>
        <p>
          <strong>아카이브 오브 옹알</strong>의 문을 열어 보세요!
        </p>
      </div>
    </section>
  );
}
