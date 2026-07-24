import Sidebar from "./components/Sidebar";
import Drawer from "./components/Drawer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div
      className=" h-screen w-full bg-gray-100 grid grid-cols-1 md:grid-cols-[260px_1fr] overflow-hidden
      "
    >
      <Drawer />

      <Sidebar />

      <main
        className="
          min-w-0
          overflow-y-auto
          overflow-x-hidden
          p-8
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1440px]
          "
        >
          <AppRoutes />
        </div>
      </main>
    </div>
  );
}

export default App;