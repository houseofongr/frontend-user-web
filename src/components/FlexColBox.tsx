import clsx from "clsx";
import React from "react";

type FlexColBoxProps = {
  label: string | React.ReactNode;
  content: string | React.ReactNode;
  //   onClick?: () => void;
  fill?: boolean;
  hasPadding?: boolean;
};

export default function FlexColBox({ label, content, fill = false, hasPadding = false }: FlexColBoxProps) {
  return (
    <div className="py-3 flex flex-col gap-1">
      <label className="min-w-40 font-extralight text-sm">{label}</label>

      <div
        className={clsx(
          "rounded-md text-start",
          { "bg-neutral-100  border border-gray-300": fill },
          { "p-3 ": hasPadding }
        )}
      >
        <div>{content}</div>
      </div>
    </div>
  );
}
