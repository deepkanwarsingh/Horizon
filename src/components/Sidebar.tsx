import { memo, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, FolderKanban, ChartColumn, Settings,ListTodo } from "lucide-react";
import { useLayout } from "../context/LayoutContext";

function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useLayout();

  const navigation = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: FolderKanban,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: ChartColumn,
    },
        {
      name: "Tasks",
      path: "/tasks",
      icon: ListTodo,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  const handleOverlayClick = useCallback(() => {
    setIsSidebarOpen(false);
  }, [setIsSidebarOpen]);

  const handleNavigationClick = useCallback(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, [setIsSidebarOpen]);

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={handleOverlayClick}
        />
      )}

      <aside
        className={`
          fixed
          top-0
          left-0
          z-40
          h-screen
          w-[260px]
          border-r
          border-gray-200/80
          bg-white
          transition-transform
          duration-300

          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:static
          md:translate-x-0
        `}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}

          <div className="border-b border-gray-100 px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-sm font-semibold text-white">
                DS
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Devspace
                </h2>

                <p className="text-xs text-gray-500">
                  Personal Workspace
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}

          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={handleNavigationClick}
                  className={({ isActive }) =>
                    `
                    group
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-medium
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? "bg-gray-900 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }
                  `
                  }
                >
                  <Icon
                    size={18}
                    className="shrink-0"
                  />

                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* User */}

          <div className="border-t border-gray-100 p-4">
            <div className="flex items-center gap-3 rounded-xl p-2 hover:bg-gray-100 transition-colors cursor-pointer">
              <img
                src="https://i.pravatar.cc/100"
                alt=""
                className="h-10 w-10 rounded-full"
              />

              <div>
                {/* <p className="text-sm font-medium text-gray-900">
                  Deepkanwar
                </p> */}

                <p className="text-xs text-gray-500">
                  Software Engineer
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default memo(Sidebar);