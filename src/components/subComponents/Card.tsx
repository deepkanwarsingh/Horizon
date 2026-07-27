import React from "react";
import { useAppSelector } from "../../hooks/reduxHooks";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({
  children,
  className = "",
}: CardProps) => {
  const { theme } = useAppSelector(
    (state) => state.settings
  );

  const isDarkMode = theme === "dark";

  return (
    <div
      className={`
        rounded-2xl
        p-6
        shadow-sm
        transition-all
        hover:shadow-md
        border
        ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;