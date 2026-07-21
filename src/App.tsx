import Sidebar from "./components/Sidebar";
import Drawer from "./components/Drawer";

function App() {
  return (
    <div
      className="  min-h-screen  w-full  bg-gray-100  grid  grid-cols-1  md:grid-cols-[260px_1fr]
      "
    >
      <Drawer />

      <Sidebar />

      <main
        className="  min-h-screen  min-w-0  overflow-x-hidden  p-8
        "
      >
        {/* Content Wrapper */}
        <div
          className="w-full  max-w-[1440px]  mx-auto
          "
        >
          <h1 className="text-4xl font-bold text-blue-600">
            Heading text
          </h1>

          <p className="mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam
            tempora aut natus incidunt ad aliquid beatae magni nisi molestiae
            consequatur, consequuntur repellendus est distinctio cumque
            recusandae in eaque eveniet voluptatem.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;