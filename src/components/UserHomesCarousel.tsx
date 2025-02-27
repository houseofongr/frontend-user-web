import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import API_CONFIG from "../config/api";

import { MdOutlineRadioButtonUnchecked, MdOutlineRadioButtonChecked } from "react-icons/md";
import { HomeListItem } from "../types/home";

type CarouselItemsProp = {
  slides: HomeListItem[];
  onHomeSelect: (homeId: number) => void;
  selectedHomeId: number | null;
};

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return <div className={className} style={{ ...style, display: "block", background: "red" }} onClick={onClick} />;
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return <div className={className} style={{ ...style, display: "block", background: "green" }} onClick={onClick} />;
// }

export default function UserHomesCarousel({ slides, onHomeSelect, selectedHomeId }: CarouselItemsProp) {
  // const slickRef = useRef(null);
  // const previous = useCallback(() => slickRef?.current?.slickPrev(), []);
  // const next = useCallback(() => slickRef?.current?.slickNext(), []);
  console.log(selectedHomeId);

  const settings = {
    dots: true,
    infinite: slides.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    className: "max-w-fit min-w-[220px]",
    // autoplay: true,
    arrow: false,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="slider-container w-[70%] md:w-[225px] ">
      <Slider {...settings}>
        {slides.map((slide, index) => {
          return (
            <div key={index} className="flex flex-col outline-none mt-4 relative">
              <div className="fixed">
                <button onClick={() => onHomeSelect(slide.id)}>
                  {slide.id === selectedHomeId ? (
                    <MdOutlineRadioButtonChecked size={20} className="text-primary cursor-not-allowed" />
                  ) : (
                    <MdOutlineRadioButtonUnchecked size={20} className="text-gray-500 cursor-pointer" />
                  )}
                </button>
              </div>

              <img
                alt={slide.name}
                width={220}
                height={220}
                className=" object-contain outline-none "
                src={`${API_CONFIG.PRIVATE_IMAGE_LOAD_API}/${slide.basicImageId}`}
              />
              <p className="text-center text-xs w-[220px] line-clamp-1 overflow-hidden break-words text-stone-50 pt-2">
                {slide.name}
              </p>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
