import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import API_CONFIG from "../config/api";

import { MdOutlineRadioButtonUnchecked, MdOutlineRadioButtonChecked } from "react-icons/md";

type HomeImage = { id: number; basicImageId: number; name: string };
type CarouselItemsProp = {
  slides: HomeImage[];
  onHomeSelect: (homeId: number) => void;
  selectedHomeId: number | null;
};

export default function UserHomesCarousel({ slides, onHomeSelect, selectedHomeId }: CarouselItemsProp) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "max-w-fit min-w-[220px]",
    // autoplay: true,
    arrow: false,
  };

  console.log(slides);
  return (
    <div className="slider-container w-[45%] md:w-[225px]">
      <Slider {...settings}>
        {slides.map((slide, index) => {
          return (
            <div key={index} className="flex flex-col outline-none pt-4 relative  cursor-pointer ">
              <div className="fixed">
                <button onClick={() => onHomeSelect(slide.id)}>
                  {slide.id === selectedHomeId ? (
                    <MdOutlineRadioButtonChecked size={20} className="text-[#F5946D] cursor-not-allowed" />
                  ) : (
                    <MdOutlineRadioButtonUnchecked size={20} className="text-gray-500" />
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
              <p className="text-center text-xs w-[220px] line-clamp-2 overflow-hidden break-words">{slide.name}</p>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
