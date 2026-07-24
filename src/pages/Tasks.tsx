import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Workspace from "../components/WorkSpace";
import { Search, Filter } from "lucide-react";

const Tasks = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read values from URL
  const search = searchParams.get("q") || "";
  const priority = searchParams.get("priority") || "all";
  const status = searchParams.get("status") || "all";

  // Mock Task Data
  const tasks = [
    {
      id: 1,
      title: "Design Dashboard UI",
      priority: "High",
      status: "In Progress",
      assignee: "John",
    },
    {
      id: 2,
      title: "API Integration",
      priority: "Medium",
      status: "Pending",
      assignee: "Alice",
    },
    {
      id: 3,
      title: "Authentication Module",
      priority: "High",
      status: "Completed",
      assignee: "David",
    },
    {
      id: 4,
      title: "Testing",
      priority: "Low",
      status: "In Progress",
      assignee: "Emma",
    },
    {
      id: 5,
      title: "Documentation",
      priority: "Low",
      status: "Completed",
      assignee: "Sophia",
    },
    {
      id: 6,
      title: "Performance Optimization",
      priority: "Medium",
      status: "Pending",
      assignee: "Chris",
    },
  ];

  const filterFields = [
  {
    label: "Search",
    type: "search",
    key: "q",
    value: search,
    placeholder: "Search tasks...",
  },
  {
    label: "Priority",
    key: "priority",
    value: priority,
    options: ["all", "high", "medium", "low"],
  },
  {
    label: "Status",
    key: "status",
    value: status,
    options: ["all", "in-progress", "pending", "completed"],
  },
];

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white";

  const panelLayout = tasks.reduce((layout, task, index) => {
    layout[`task${task.id}`] = {
      row: Math.floor(index / 3) + 1,
      column: (index % 3) + 1,
    };
    return layout;
  }, {} as Record<string, { row: number; column: number }>);

  // Filter Tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.assignee.toLowerCase().includes(search.toLowerCase());

      const matchesPriority =
        priority === "all" || task.priority.toLowerCase() === priority;

      const matchesStatus =
        status === "all" ||
        task.status.toLowerCase().replace(/\s/g, "-") === status;

      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [search, priority, status]);

  // Update URL Search Params
  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === "" || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    setSearchParams(params, {
  replace: true,
});
  };

  return (

  <Workspace
    subtitle="Workspace"
    title="Task Manager"
    description="Manage, search and filter your workspace tasks."
  >

{/* Filters */}
<div className="mb-8 rounded-2xl border bg-white p-5 shadow-sm">

  <div className="mb-5 flex items-center gap-3">
    <div className="rounded-xl bg-blue-100 p-2 text-blue-600">
      <Filter size={18}/>
    </div>

    <div>
      <h2 className="font-semibold text-gray-800">
        Task Filters
      </h2>
      <p className="text-xs text-gray-500">
        Find tasks quickly
      </p>
    </div>

    <span className="ml-auto rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
      {filteredTasks.length} Tasks
    </span>
  </div>


  <div className="grid gap-4 md:grid-cols-3">

    {filterFields.map((field)=>(
      <div key={field.key}>

        <label className="mb-2 block text-sm font-medium text-gray-700">
          {field.label}
        </label>


        {field.type==="search" ? (

          <div className="relative">

            <Search 
              size={18}
              className="absolute left-3 top-3.5 text-gray-400"
            />

            <input
              value={field.value}
              placeholder={field.placeholder}
              onChange={(e)=>
                updateQuery(field.key,e.target.value)
              }
              className={`${inputClass} pl-10`}
            />

          </div>


        ) : (

          <select
            value={field.value}
            onChange={(e)=>
              updateQuery(field.key,e.target.value)
            }
            className={inputClass}
          >

            {field.options?.map(option=>(
              <option key={option} value={option}>
                {option
                  .replace("-"," ")
                  .replace(/\b\w/g,c=>c.toUpperCase())}
              </option>
            ))}

          </select>

        )}

      </div>
    ))}

  </div>

</div>




    {/* Active Params */}

    <div className="
      mb-8 flex flex-wrap gap-3
      rounded-2xl bg-gradient-to-r 
      from-blue-50 to-indigo-50
      p-5
    ">


      <div className="text-sm">
        <span className="font-semibold">
          Search:
        </span>{" "}
        {search || "All"}
      </div>


      <div className="text-sm">
        <span className="font-semibold">
          Priority:
        </span>{" "}
        {priority}
      </div>


      <div className="text-sm">
        <span className="font-semibold">
          Status:
        </span>{" "}
        {status}
      </div>


    </div>






    {/* Task Cards */}

    <div className="
      grid gap-6
      sm:grid-cols-2
      xl:grid-cols-3
    ">


    {filteredTasks.map((task)=>{

      const position =
      panelLayout[`task${task.id}`];


      return (

      <div
        key={task.id}
        className="
        group rounded-2xl
        border bg-white p-6
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-xl
        "
      >


        {/* Header */}

        <div className="
          mb-5 flex items-start
          justify-between
        ">

          <div>

            <h3 className="
            text-lg font-bold
            text-gray-800
            group-hover:text-blue-600
            transition
            ">
              {task.title}
            </h3>


            <p className="
            mt-1 text-sm text-gray-500
            ">
              Assigned to {task.assignee}
            </p>

          </div>


          <span className="
          rounded-full bg-gray-100
          px-3 py-1 text-xs
          font-semibold
          ">
            #{task.id}
          </span>


        </div>




        {/* Details */}


        <div className="space-y-3">


          <div className="
          flex justify-between
          text-sm
          ">

            <span className="text-gray-500">
              Priority
            </span>


            <span
            className={`
            rounded-full px-3 py-1 text-xs font-semibold
            ${
              task.priority==="High"
              ?"bg-red-100 text-red-600"
              :
              task.priority==="Medium"
              ?"bg-yellow-100 text-yellow-700"
              :
              "bg-green-100 text-green-600"
            }
            `}
            >
              {task.priority}
            </span>

          </div>





          <div className="
          flex justify-between
          text-sm
          ">

            <span className="text-gray-500">
              Status
            </span>


            <span
            className={`
            rounded-full px-3 py-1 text-xs font-semibold
            ${
              task.status==="Completed"
              ?"bg-green-100 text-green-700"
              :
              task.status==="Pending"
              ?"bg-orange-100 text-orange-700"
              :
              "bg-blue-100 text-blue-700"
            }
            `}
            >
              {task.status}
            </span>


          </div>


        </div>




        {/* Layout Info */}

        <div className="
        mt-6 rounded-xl
        bg-gray-50 p-4
        text-xs text-gray-600
        ">

          <p className="
          mb-2 font-semibold text-gray-700
          ">
            Panel Position
          </p>


          <div className="flex gap-4">

            <span>
              Row: {position?.row}
            </span>


            <span>
              Column: {position?.column}
            </span>

          </div>

        </div>



      </div>

      );

    })}


    </div>






    {filteredTasks.length===0 && (

      <div className="
      mt-10 rounded-2xl
      border border-dashed
      p-12 text-center
      ">

        <h3 className="font-semibold text-gray-700">
          No tasks found
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Try changing your search filters.
        </p>

      </div>

    )}


  </Workspace>

  );
};

export default Tasks;