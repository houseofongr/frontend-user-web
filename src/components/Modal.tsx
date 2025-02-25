import React, { ReactNode } from "react";
import { IoMdClose, IoIosWarning } from "react-icons/io";
import Button from "./common/Button";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className={"rounded-lg shadow-lg p-4 relative overflow-hidden min-w-[40%] bg-stone-800/90"}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-5 right-10 text-white hover:cursor-pointer">
          <IoMdClose size={20} />
        </button>
        {/* 헤더 */}
        <div className="flex items-center gap-2 pb-3 mb-4">
          <IoIosWarning size={20} className="text-yellow-500" />
          <p className="text-xl text-white">알림</p>
        </div>
        <div className="min-h-[10vh] overflow-y-auto p-4 text-center ">{children}</div>
        <div className="flex justify-center pb-10">
          <Button label="확인" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
