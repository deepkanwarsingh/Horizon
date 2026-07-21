import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type LayoutContextType = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LayoutContext = createContext<LayoutContextType | null>(null);

export function LayoutProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleBreakpointChange = () => {
      setIsSidebarOpen(false);
    };

    mediaQuery.addEventListener("change", handleBreakpointChange);

    return () => {
      mediaQuery.removeEventListener("change", handleBreakpointChange);
    };
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error("useLayout must be used inside LayoutProvider");
  }

  return context;
}