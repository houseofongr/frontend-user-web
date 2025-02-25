import React, { ChangeEvent } from "react";

type Props = {
  label: string;
  type?: string;
  name: string;

  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
};

function ContactInput({ label, type, name, placeholder, onChange, value }: Props) {
  //   const COMMON_STYLE = "p-2 border placeholder:italic placeholder:text-slate-400 placeholder:text-sm";

  const COMMON_STYLE = "p-2 bg-white border border-gray-300 rounded-md";

  return (
    <div className="m-4 flex flex-col">
      <label htmlFor={name} className="pb-1 font-light text-xs">
        {label}
      </label>
      {label === "내용" ? (
        <textarea
          required
          id={name}
          name={name}
          placeholder={placeholder}
          className={`${COMMON_STYLE}`}
          onChange={onChange}
          value={value}
          rows={7}
        />
      ) : (
        <input
          required
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          className={COMMON_STYLE}
          onChange={onChange}
          value={value}
        />
      )}
    </div>
  );
}

export default React.memo(ContactInput);
