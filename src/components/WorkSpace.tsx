import React from "react";
import Card from "./subComponents/Card";
import { useAppSelector } from "../hooks/reduxHooks";

interface WorkspaceCardItem {
  id: string;
  content: React.ReactNode;
  className?: string;
}

interface WorkspaceProps {
  title: string;
  subtitle: string;
  description: string;
  cards?: WorkspaceCardItem[];
  children?: React.ReactNode;
}

const Workspace = ({
  title,
  subtitle,
  description,
  cards = [],
  children,
}: WorkspaceProps) => {
  const { theme } = useAppSelector(
    (state) => state.settings
  );

  const isDarkMode = theme === "dark";

  return (
    <section className="mx-auto w-full max-w-[1440px]">
      <header className="mb-10">
        <p
          className={`text-sm font-medium transition-colors ${
            isDarkMode
              ? "text-gray-400"
              : "text-gray-500"
          }`}
        >
          {subtitle}
        </p>

        <h1
          className={`mt-2 text-4xl font-semibold tracking-tight transition-colors ${
            isDarkMode
              ? "text-white"
              : "text-gray-900"
          }`}
        >
          {title}
        </h1>

        <p
          className={`mt-3 max-w-2xl text-base leading-7 transition-colors ${
            isDarkMode
              ? "text-gray-300"
              : "text-gray-600"
          }`}
        >
          {description}
        </p>
      </header>

      {cards.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <Card
              key={card.id}
              className={card.className ?? ""}
            >
              {card.content}
            </Card>
          ))}
        </div>
      )}

      {children}
    </section>
  );
};

export default Workspace;