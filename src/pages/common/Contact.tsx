import { Link } from "react-router-dom";
import ContactForm from "../../components/ContactForm";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../../constants/componentSize";
// import { SiYoutube } from "react-icons/si";
import { SlSocialInstagram } from "react-icons/sl";
import { FaLocationDot } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

const contactInfo = [
  { icon: <IoMail size={17} color="#f5946d" />, text: "contact@archiveofongr.com" },
  { icon: <FaPhoneAlt size={15} color="#f5946d" />, text: "010-0000-0000" },
];

const locationInfo = {
  icon: <FaLocationDot size={17} color="#f5946d" />,
  text: "2, Dongil-ro 2-gil, Gwangjin-gu, Seoul Republic of Korea",
};

const businessHours = [
  { label: "Week", time: "10:00 - 20:00" },
  { label: "Lunch", time: "12:00 - 13:00" },
];

const snsLinks = [
  {
    icon: <SlSocialInstagram size={30} />,
    url: "https://www.instagram.com/houseofongr/?utm_source=ig_web_button_share_sheet",
    label: "instagram",
  },
  // {
  //   icon: <SiYoutube size={30} />,
  //   url: "",
  //   label: "youtube",
  // },
];

export default function ContactPage() {
  return (
    <div
      className="w-full flex flex-col bg-neutral-100"
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)` }}
    >
      <div className="w-[80%] flex-col md:flex-row flex items-center justify-center m-auto gap-20  py-10">
        {/* 왼쪽 섹션 */}
        <section className="w-full md:w-2/5 flex-col flex gap-6 pl-10">
          <div>
            <p className="my-1 font-bold">CONTACT</p>
            {contactInfo.map((item, index) => (
              <p key={index} className="flex gap-2 items-center font-extralight text-sm py-2">
                <div className="p-2 rounded-full bg-white">{item.icon}</div>
                <span>{item.text}</span>
              </p>
            ))}
          </div>

          {/* location info */}
          <div>
            <p className="my-1 font-bold">LOCATION</p>
            <p className="flex gap-2 items-center font-extralight text-sm py-2">
              <div className="p-2 rounded-full bg-white">{locationInfo.icon}</div>
              <span>{locationInfo.text}</span>
            </p>
          </div>

          {/* business hours info */}
          <div>
            <p className="my-1 font-bold">BUSINESS HOURS</p>
            <div className="pl-2 text-sm font-extralight">
              {businessHours.map((item, index) => (
                <p key={index}>
                  ・ {item.label} {item.time}
                </p>
              ))}
            </div>
          </div>

          {/* sns info */}
          <div>
            <p className="my-1 font-bold">SNS</p>
            <div className=" flex  p-2 gap-4">
              {snsLinks.map((item, index) => (
                <Link key={index} to={item.url} target="_blank" className="max-w-[80px] flex-center flex-col">
                  {item.icon}
                  <p className="text-[10px] font-extralight">{item.label}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
        {/* 오른쪽 섹션 */}
        <section className="md:w-1/2 lg:w-2/5 shadow-md flex-col flex p-2 lg:p-7 bg-white rounded">
          <div className="m-4">
            <p className="text-2xl font-extrabold py-1">CONTACT US</p>
            <p className="text-sm md:text-base font-extralight mb-5">
              '아카이브 오브 옹알'에 궁금한 점이나 문의 사항이 있다면 아래 양식을 작성해 주세요.
            </p>
          </div>

          <ContactForm />
        </section>
      </div>
    </div>
  );
}
