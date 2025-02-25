import ContactForm from "../../components/ContactForm";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../../constants/componentSize";

export default function ContactPage() {
  return (
    <div
      className="w-full flex flex-col bg-neutral-100"
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)` }}
    >
      <div className="w-[70%] flex m-auto gap-20">
        <section className="w-1/2  flex-center">
          <div className="text-start">
            <p>E-Mail : houseofongr@naver.com Address</p>
            <p> Address : 2, Dongil-ro 2-gil, Gwangjin-gu, Seoul Republic of Korea</p>
            <p>주소 : 서울시 광진구 동일로 2길2 4F</p>
          </div>
        </section>
        <section className="w-1/2 flex-col flex p-7 bg-white rounded">
          <div className="m-4">
            <p className="text-2xl font-extrabold py-1">CONTACT US</p>
            <p className="font-extralight mb-5">
              '아카이브 오브 옹알'에 궁금한 점이나 문의 사항이 있다면 아래 양식을 작성해 주세요.
            </p>
          </div>

          <ContactForm />
        </section>
      </div>
    </div>
  );
}
