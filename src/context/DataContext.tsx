import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

type NavigationEntry = string; // adjust as needed

interface DataContextType {
  data: any | null;
  setData: Dispatch<SetStateAction<any | null>>;

  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;

  navigationHistory: string[];
  setNavigationHistory: Dispatch<SetStateAction<string[]>>;

  historyIndex: number;
  setHistoryIndex: Dispatch<SetStateAction<number>>;
}
const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<any | null>(null);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<string>("projects");

  // Navigation history (for future)
const [navigationHistory, setNavigationHistory] = useState<string[]>([
  "projects",
]);

const [historyIndex, setHistoryIndex] = useState(0);
  return (
  <DataContext.Provider
  value={{
    data,
    setData,

    activeTab,
    setActiveTab,

    navigationHistory,
    setNavigationHistory,

    historyIndex,
    setHistoryIndex,
  }}
>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useData must be used inside DataProvider");
  }

  return context;
};