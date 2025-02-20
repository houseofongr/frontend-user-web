import clsx from "clsx";
import React from "react";

type CheckboxInputProps = {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  justify?: "center" | "start" | "end";
  hasBorder?: boolean;
};

export default function CustomCheckboxInput({
  label,
  checked,
  onChange,
  id,
  justify = "end",
  hasBorder = false,
}: CheckboxInputProps) {
  return (
    <div
      className={clsx(`inline-flex w-full p-2 justify-${justify}`, {
        "border p-3 border-gray-300": hasBorder,
      })}
    >
      <label className="flex items-center cursor-pointer relative " htmlFor={id}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer h-4 w-4 cursor-pointer transition-all appearance-none rounded border border-slate-300 bg-white checked:bg-slate-800 checked:border-slate-800"
          id={id}
        />
        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </label>
      <label className="cursor-pointer ml-2" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
