import { Link } from "react-router-dom";
import ContactForm from "../../components/ContactForm";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../../constants/componentSize";
import { SlSocialInstagram } from "react-icons/sl";
import { FaLocationDot } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IoTime } from "react-icons/io5";

const contactInfo = [
  { icon: <IoMail size={20} color="#f5946d" />, label: "메일 주소", text: "contact@archiveofongr.com" },
  { icon: <FaPhoneAlt size={20} color="#f5946d" />, label: "핸드폰", text: "010-0000-0000" },
  {
    icon: <FaLocationDot size={20} color="#f5946d" />,
    label: "위치",
    text: "2, Dongil-ro 2-gil, Gwangjin-gu, Seoul Republic of Korea",
  },
  {
    icon: <IoTime size={20} color="#f5946d" />,
    label: "영업 시간",
    text: "Week : 10:00 - 20:00  /  Lunch : 12:00 - 13:00 ",
  },
];

const snsLinks = [
  {
    icon: <SlSocialInstagram size={30} />,
    url: "https://www.instagram.com/houseofongr/?utm_source=ig_web_button_share_sheet",
    label: "instagram",
  },
  // {
  //   icon: <SlSocialYoutube size={30} />,
  //   url: "https://www.instagram.com/houseofongr/?utm_source=ig_web_button_share_sheet",
  //   label: "youtube",
  // },
];

export default function ContactPage() {
  return (
    <div
      className="w-full flex flex-col bg-neutral-100"
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)` }}
    >
      <div className="mx-8 md:mx-auto md:w-[70%] flex-col md:flex-row flex items-center justify-center m-auto gap-20  py-10">
        {/* 왼쪽 섹션 */}
        <section className="md:w-1/2 min-h-[600px] flex-col">
          <p className="text-xl md:text-2xl">문의</p>
          <p className="text-sm md:text-base font-extralight mb-10">
            아래의 이메일 주소를 사용하거나 양식을 사용하여 문의 부탁 드립니다.
          </p>

          <ul className="pl-4">
            {contactInfo.map((item, index) => (
              <li key={index} className="flex gap-4 items-center py-3">
                <div className="p-3 rounded-full bg-white">{item.icon}</div>
                <div className="flex flex-col leading-tight">
                  <label className="text-[10px] md:text-xs">{item.label}</label>
                  <span className="font-extralight text-sm md:text-base">{item.text}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="py-10">
            <p className="text-sm md:text-base font-extralight">SNS</p>
            <ul className="p-4 flex gap-2">
              {snsLinks.map((sns, index) => {
                return (
                  <li key={index}>
                    <Link to={sns.url} target="_blank" className="flex-center flex-col">
                      <div>{sns.icon}</div>
                      <label className="text-xs">{sns.label}</label>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        {/* 오른쪽 섹션 */}
        <section className="md:w-1/2 shadow-md flex-col flex p-3 lg:p-7 bg-white rounded">
          <div>
            <p className="text-sm md:text-base font-extralight ">
              '아카이브 오브 옹알'에 궁금한 점이나 문의 사항이 있다면 아래 양식을 작성해 주세요.
            </p>
          </div>

          <ContactForm />
        </section>
      </div>
    </div>
  );
}
