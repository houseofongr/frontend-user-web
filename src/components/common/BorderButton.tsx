type BorderButtonType = {
  onClick: () => void;
  label: string;
  type?: "submit" | "button";
};
export default function BorderButton({ onClick, label, type = "button" }: BorderButtonType) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-2 py-1 rounded border border-[#F5946D] text-[#F5946D] text-xs cursor-pointer"
    >
      {label}
    </button>
  );
}
