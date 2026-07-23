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
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        px-5
        py-3
        text-sm
        font-medium
        transition-all
        duration-200
        ease-in-out
        focus:outline-none
        focus:ring-2
        focus:ring-gray-300
        active:scale-[0.98]

        ${
          disabled
            ? `
              cursor-not-allowed
              bg-gray-100
              text-gray-400
            `
            : `
              bg-gray-900
              text-white
              shadow-sm
              hover:bg-black
              hover:shadow-md
            `
        }

        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;