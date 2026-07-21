import { memo, useCallback, useState } from "react";
import { useLayout } from "../context/LayoutContext";

function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useLayout();

  const [activeTab, setActiveTab] = useState("Dashboard");

  const navigation = [
    { name: "Dashboard" },
    { name: "Projects" },
    { name: "Analytics" },
    { name: "Settings" },
  ];

  const handleOverlayClick = useCallback(() => {
    setIsSidebarOpen(false);
  }, [setIsSidebarOpen]);

  const handleNavigationClick = useCallback(
    (tab: string) => {
      setActiveTab(tab);

      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    },
    [setIsSidebarOpen]
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          top-0
          left-0
          z-40

          h-screen
          w-[260px]

          border-r
          border-gray-200
          bg-white
          p-6

          transform
          transition-transform
          duration-300

          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:static
          md:translate-x-0
          md:shrink-0
        `}
      >
        <nav className="flex w-full flex-col gap-2">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigationClick(item.name)}
              className={`flex w-full items-center rounded-lg px-4 py-3 text-left transition-colors ${
                activeTab === item.name
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default memo(Sidebar);