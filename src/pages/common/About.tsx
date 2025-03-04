import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../../constants/componentSize";

const SERVICE_FEATURES = [
  {
    src: "https://www.houseofongr.com/_next/image?url=%2Fimages%2Fbusiness%2F001.png&w=256&q=75",
    title: "인터랙티브한 공간 속 소리 경험",
    text: "집의 단면도를 기반으로 각 공간(방)에 입장하여 오브젝트를 클릭하면, 시각적인 파형과 함께 오디오를 감상할 수 있습니다.",
  },

  {
    src: "https://www.houseofongr.com/_next/image?url=%2Fimages%2Fbusiness%2F002.png&w=256&q=75",
    title: "나만의 소리 아카이빙",
    text: "개인적인 기록부터 소중한 순간까지, 다양한 소리를 공간과 함께 보관할 수 있습니다.",
  },
  {
    src: "https://www.houseofongr.com/_next/image?url=%2Fimages%2Fbusiness%2F003.png&w=256&q=75",
    title: "연속적인 테마 변화",
    text: "매년 한 번씩 새로운 테마가 추가되며, 기존 사용자들이 이전 테마의 데이터를 유지하면서도 새로운 테마를 경험할 수 있도록 설계되었습니다.",
  },
];

export default function AboutPage() {
  return (
    <div
      className="w-full flex flex-col justify-between items-center bg-neutral-100 "
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)` }}
    >
      <section className="mx-8 py-10 md:py-20 w-[70%]  flex flex-col">
        <p className="text-xl md:text-2xl mb-5">소개</p>

        <div className="space-y-1.5 flex justify-center  text-[15px]">
          <div className="md:max-w-[60%] ">
            <p>
              <strong>아카이브 오브 옹알</strong>은
            </p>
            <p>「기억을 가장 생생하게 기록하는 방법은 소리다」 라는 생각을 시작으로</p>
            <p>개인의 일상을 소리로 포착하고 적재하기 위해 만들어졌습니다.</p>
            <br />

            <p>소리를 통해 나를 기록하고</p>
            <p>그 기록이 또 다른 누군가에게 오랜 기억의 저장고가 될 수 있도록 돕는 </p>
            <p>[소리 채록] 프로그램과</p>
            <br />

            <p>채록된 소리를 안전하게 장기적으로 보존하는</p>
            <p>디지털 아카이브 플랫폼을 개발하고 운영 합니다.</p>
            <br />

            <p>시간을 담는 소리의 집,</p>
            <p>
              <strong>아카이브 오브 옹알</strong>의 문을 열어 보세요!
            </p>
          </div>
        </div>
        <aside className="mt-20">
          <p className="text-xl md:text-2xl pb-5 mb-5">서비스 특징</p>
          <ul className="flex flex-col md:flex-row md:gap-2 lg:gap-10 justify-center ">
            {SERVICE_FEATURES.map((item, index) => {
              return (
                <li key={index} className="flex-center flex-col md:w-1/3 lg:w-[22%] p-3 border-gray-200">
                  <img src={item.src} alt={item.text} width={100} height={100} className="mb-5 animate-bounce" />
                  <div className="min-h-32 text-center">
                    <p className="text-sm pb-2 ">{item.title}</p>
                    <div className="text-[13px] font-extralight">{item.text}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </aside>
      </section>
    </div>
  );
}
