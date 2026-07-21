import { memo, useCallback } from "react";
import { useLayout } from "../context/LayoutContext";

function Drawer() {
  const { isSidebarOpen, setIsSidebarOpen } = useLayout();

  const handleToggle = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, [setIsSidebarOpen]);

  return (
    <div
      onClick={handleToggle}
      className="
        fixed
        left-0
        top-1/2
        z-50

        flex
        h-20
        w-6
        -translate-y-1/2

        cursor-pointer
        items-center
        justify-center

        rounded-r-md
        bg-white
        text-gray-700
        border
        border-gray-200
        shadow-md

        md:hidden
      "
    >
      {isSidebarOpen ? "‹" : "›"}
    </div>
  );
}

export default memo(Drawer);