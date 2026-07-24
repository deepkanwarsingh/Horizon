import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface PanelCoordinate {
  row: number;
  column: number;
}

interface PanelLayout {
  [key: string]: PanelCoordinate;
}

interface DataContextType {
  data: any |null;
  setData: Dispatch<SetStateAction<any | null>>;

  // Dashboard
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;

  // Navigation History
  navigationHistory: string[];
  setNavigationHistory: Dispatch<SetStateAction<string[]>>;

  historyIndex: number;
  setHistoryIndex: Dispatch<SetStateAction<number>>;

  // Panel Layout
  panelLayout: PanelLayout;
  setPanelLayout: Dispatch<SetStateAction<PanelLayout>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [data, setData] = useState<any | null>(null);

  // Dashboard
  const [activeTab, setActiveTab] = useState("projects");

  // Navigation History
  const [navigationHistory, setNavigationHistory] = useState([
    "projects",
  ]);

  const [historyIndex, setHistoryIndex] = useState(0);

  // Panel Coordinates
  const [panelLayout, setPanelLayout] = useState<PanelLayout>({
    task1: {
      row: 1,
      column: 1,
    },
    task2: {
      row: 1,
      column: 2,
    },
    task3: {
      row: 2,
      column: 1,
    },
    task4: {
      row: 2,
      column: 2,
    },
    task5: {
      row: 3,
      column: 1,
    },
    task6: {
      row: 3,
      column: 2,
    },
  });

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

        panelLayout,
        setPanelLayout,
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