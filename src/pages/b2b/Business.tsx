import Slider from "react-slick";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../../constants/componentSize";

const CLIENT_LIST = [
  { id: 1, name: "한국 백혈병 어린이재단", image: "/images/clientLogo/logo_1.png" },
  { id: 2, name: "삼성", image: "/images/clientLogo/logo_2.png" },
  { id: 3, name: "러쉬", image: "/images/clientLogo/logo_3.png" },
  { id: 4, name: "디올", image: "/images/clientLogo/logo_4.png" },
  { id: 5, name: "샤넬", image: "/images/clientLogo/logo_5.png" },
];
export default function BusinessPage() {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: false,
    className: "pl-20",
    autoplay: true,
    arrow: false,
  };
  return (
    <div
      className="w-full flex flex-col justify-between items-center bg-neutral-100"
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)` }}
    >
      <section className=" w-[70%] py-10 md:py-20">
        <span className="text-xl md:text-2xl">비즈니스</span>
        <p className="text-sm md:text-base font-extralight mb-5">서브 타이틀 </p>
        <div className="text-center space-y-3 text-[15px]">
          <p>
            <strong>아카이브 오브 옹알은 기업</strong>을 상대로 영업합니다.
          </p>
          <p>사용자들의 소리를 저장하고 공개할 수 있습니다.</p>
          <p>다양한 소리를 통해 사용자들을 불러 모으세요.</p>
          <br />
          <p>고객들의 소리를 담은 집도 만들고 영상도 만들고 여러 니즈를 만족시키세요.</p>
          <p>
            <strong>아카이브 오브 옹알</strong>과 함께 <strong>클라우드 디지털 아카이빙 플랫폼</strong>을 구축하세요.
          </p>
        </div>
      </section>
      <section className="w-full py-8 ">
        {/* <div className="text-xl md:text-2xl font-extralight text-center mb-10">고객사</div> */}

        <div className="slider-container px-10">
          <Slider {...settings}>
            {CLIENT_LIST.map((slide, index) => {
              return (
                <div key={index} className="flex flex-col outline-none mt-4 relative">
                  <img
                    alt={slide.name}
                    width={250}
                    height={150}
                    className="object-contain outline-none "
                    src={slide.image}
                  />
                </div>
              );
            })}
          </Slider>
        </div>
      </section>
    </div>
  );
}
