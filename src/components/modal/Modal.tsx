import clsx from "clsx";
import React, { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
  bgColor?: "white" | "dark";
  bgOpacity?: number;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  children,
  bgColor = "white",
  bgOpacity = 90,
}) => {
  // bgOpacity를 0~1 사이 값으로 변환
  const opacity = Math.min(Math.max(bgOpacity, 0), 100) / 100;

  // bg-stone-800 rgb값: (63, 70, 77)
  const darkBgColor = `rgba(0,0,0, ${opacity})`;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex-center z-20"
      onClick={onClose}
    >
      <div
        className={clsx(
          "rounded-lg shadow-lg p-4 relative max-w-[1100px] max-h-[80vh] overflow-auto",
          {
            "bg-white": bgColor === "white",
          }
        )}
        style={
          bgColor === "dark" ? { backgroundColor: darkBgColor } : undefined
        }
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={clsx("absolute top-10 right-10  ", {
            "text-gray-500": bgColor === "white",
            "text-white": bgColor === "dark",
          })}
        >
          <IoMdClose size={20} className="cursor-pointer hover:opacity-80" />
        </button>
        <div className=" p-4 ">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
