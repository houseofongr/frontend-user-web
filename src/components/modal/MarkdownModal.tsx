import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { IoMdClose } from "react-icons/io";

type MarkdownModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  filePath: string;
};

export default function MarkdownModal({ isOpen, onClose, title, filePath }: MarkdownModalProps) {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetch(filePath)
        .then((res) => res.text())
        .then((text) => setContent(text))
        .catch((err) => console.error("내용을 불러오는 중 오류 발생:", err));
    }
  }, [isOpen, filePath]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50" onClick={onClose}>
      <div className="bg-white p-6 shadow-lg w-[90%] md:w-[600px] max-h-[80vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute right-5">
          <IoMdClose size={20} />
        </button>
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <ReactMarkdown rehypePlugins={[rehypeRaw]} className="text-xs md:text-sm leading-relaxed">
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
