import React, { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex-center z-10 p-4" onClick={onClose}>
      <div
        className="rounded-lg shadow-lg relative overflow-hidden md:w-[80%] max-w-[400px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1100px] max-h-[90vh] sm:max-h-[90vh] bg-stone-800/90 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-5 right-5 cursor-pointer md:text-2xltext-white">
          <IoMdClose />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
