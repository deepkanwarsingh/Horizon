import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({
  children,
  className = "",
}: CardProps) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;