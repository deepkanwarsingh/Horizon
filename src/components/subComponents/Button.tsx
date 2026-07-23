import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button = ({
  type = "button",
  children,
  disabled = false,
  className = "",
  onClick,
}: ButtonProps) => {
  const defaultClasses =
    "w-full rounded-xl py-3 font-semibold transition-all duration-300 ease-in-out";

  const stateClasses = disabled
    ? "cursor-not-allowed bg-gray-300 text-gray-500"
    : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02]";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${defaultClasses} ${stateClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;