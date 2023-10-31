function CohortCard({ title, classId, viewProjects }) {
  return (
    <div className="border-2 px-5 py-3 rounded-md">
      <div className="flex flex-col gap-5 items-center">
        <h3 className="text-xl font-medium">{title}</h3>
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded-full cursor-pointer mt-4"
          onClick={() => viewProjects(classId)}
        >
          view projects
        </button>
      </div>
    </div>
  );
}

export default CohortCard;
