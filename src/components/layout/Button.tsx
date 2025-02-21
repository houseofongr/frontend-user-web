import clsx from "clsx";

type ButtonProps = {
  label: string | React.ReactNode;
  type?: "submit" | "button";
  onClick?: () => void;
  disabled?: boolean;
  size?: "small" | "default";
  variant?: "primary" | "outline";
};

export default function Button({
  label,
  type = "button",
  onClick,
  disabled,
  size = "default",
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        "rounded-lg px-4 py-2 md:px-20 md:py-3 text-sm cursor-pointer",
        {
          "bg-primary text-white disabled:cursor-not-allowed": variant === "primary",
          "border border-primary text-primary bg-transparent": variant === "outline",
        },
        {
          "px-2 py-2 text-xs": size === "small",
        }
      )}
    >
      {label}
    </button>
  );
}

//  <button className="rounded-lg border border-primary px-4 py-2 md:px-20 md:py-3 text-sm text-primary">취소</button>;
