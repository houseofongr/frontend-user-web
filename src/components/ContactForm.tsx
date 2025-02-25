import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import ContactInput from "./ContactInput";
import Button from "./common/Button";

const DEFAULT_DATA = {
  from: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(DEFAULT_DATA);

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("form data", form);
  };

  return (
    <form className="text-sm" onSubmit={formSubmitHandler}>
      <ContactInput
        label="이메일"
        type="email"
        name="from"
        placeholder="메일 주소를 입력해주세요."
        onChange={onChangeHandler}
        value={form.from}
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
        <Button label="전송" />
      </div>
    </form>
  );
}
