import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
import emailjs from "emailjs-com";
import ContactInput from "./ContactInput";
import Button from "./common/Button";

const DEFAULT_DATA = {
  from_name: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(DEFAULT_DATA);
  const [status, setStatus] = useState<{ message: string | null; isSuccess: boolean | null }>({
    message: null,
    isSuccess: null,
  });
  const formRef = useRef<HTMLFormElement | null>(null);

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;
    console.log(formRef.current);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setForm(DEFAULT_DATA);
          setStatus({ message: "메일이 성공적으로 전송되었습니다.", isSuccess: true });
          setTimeout(() => setStatus({ message: null, isSuccess: null }), 3000);
        },
        (error) => {
          console.log(error.text);
          setStatus({ message: "메일 전송이 실패하였습니다.다시 시도해주세요.", isSuccess: false });
          setTimeout(() => setStatus({ message: null, isSuccess: null }), 5000);
        }
      );
  };

  return (
    <div>
      {status.message && (
        <div
          className={`text-center font-extralight p-1  ${
            status.isSuccess ? "bg-blue-100 text-blue-600" : "bg-red-100 text-red-600"
          }`}
        >
          {status.message}
        </div>
      )}
      <form ref={formRef} className="text-sm" onSubmit={sendEmail}>
        <ContactInput
          label="이메일"
          type="email"
          name="from_name"
          placeholder="메일 주소를 입력해주세요."
          onChange={onChangeHandler}
          value={form.from_name}
        />
        <ContactInput
          label="제목"
          type="text"
          name="subject"
          placeholder="제목을 입력해주세요."
          onChange={onChangeHandler}
          value={form.subject}
        />
        <ContactInput
          label="내용"
          type="text"
          name="message"
          placeholder="내용을 입력해주세요"
          onChange={onChangeHandler}
          value={form.message}
        />

        <div className="text-center py-5">
          <Button label="전송" type="submit" variant="outline" />
        </div>
      </form>
    </div>
  );
}
