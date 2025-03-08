// import clsx from "clsx";
// import React, { ReactNode } from "react";
// import { IoMdClose } from "react-icons/io";
// interface ModalProps {
//   onClose: () => void;
//   children: ReactNode;
//   bgColor?: "white" | "dark";
// }
// const Modal: React.FC<ModalProps> = ({ onClose, children, bgColor = "dark" }) => {
//   return (
//     <div className="fixed inset-0 bg-black/70 flex-center z-10" onClick={onClose}>
//       <div
//         className={clsx("rounded-lg shadow-lg p-4 relative overflow-hidden max-w-[1100px] ", {
//           "bg-white": bgColor === "white",
//           "bg-stone-800/90": bgColor === "dark",
//         })}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           onClick={onClose}
//           className={clsx("absolute top-10 right-10 cursor-pointer", {
//             "text-gray-500": bgColor === "white",
//             "text-white": bgColor === "dark",
//           })}
//         >
//           <IoMdClose size={20} />
//         </button>
//         <div className="p-4">{children}</div>
//       </div>
//     </div>
//   );
// };
// export default Modal;

import clsx from "clsx";
import React, { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
  bgColor?: "white" | "dark";
}

const Modal: React.FC<ModalProps> = ({ onClose, children, bgColor = "dark" }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex-center z-10 p-4" onClick={onClose}>
      <div
        className={clsx(
          "rounded-lg shadow-lg relative overflow-hidden",
          "md:w-[80%] max-w-[400px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1100px] max-h-[90vh] sm:max-h-[90vh]",
          {
            "bg-white text-black": bgColor === "white",
            "bg-stone-800/90 text-white": bgColor === "dark",
          }
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={clsx("absolute top-5 right-5 cursor-pointer md:text-2xl", {
            "text-gray-500": bgColor === "white",
            "text-white": bgColor === "dark",
          })}
        >
          <IoMdClose />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
