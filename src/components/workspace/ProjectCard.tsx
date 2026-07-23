import Button from "../subComponents/Button";

const ProjectsCard = () => {
  return (
    <>
      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
        Projects
      </span>

      <h2 className="mt-5 text-4xl font-bold tracking-tight text-gray-900">
        24
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        6 new projects this month
      </p>

      <div className="mt-6">
        <Button className="w-auto px-6">
          View Projects
        </Button>
      </div>
    </>
  );
};

export default ProjectsCard;