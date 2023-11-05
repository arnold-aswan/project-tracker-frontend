import { useContext, useState, useEffect } from "react";
import AppContext from "../context/Appcontext";
import Project from "../components/Project";
import { BsGridFill } from "react-icons/bs";
import { FaTableList } from "react-icons/fa6";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

export default function Projects() {
  const { projects, selectedClass, handleDelete, loading } =
    useContext(AppContext);
  const [view, setView] = useState("grid");
  // console.log(projects);

  const originalProjects = projects;
  const [filteredProjects, setFilteredProjects] = useState(originalProjects);
  const [projectType, setProjectType] = useState("All");

  useEffect(() => {
    if (selectedClass) {
      const filtered = originalProjects.filter(
        (item) => item.class_id === selectedClass
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(originalProjects);
    }
  }, [selectedClass, originalProjects]);

  const handleFilter = (e) => {
    const selected = e.target.value;
    setProjectType(selected);

    if (selected === "All") {
      setFilteredProjects(originalProjects);
    } else {
      const filtered = originalProjects.filter(
        (item) => item.project_type === selected
      );
      setFilteredProjects(filtered);
    }
  };

  return (
    <>
      {loading && (
        <div className="max-w-[7rem] mx-auto">
          <ClimbingBoxLoader
            color={"#000000"}
            loading={loading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {projects ? (
        <h1 className="text-center text-2xl font-semibold mb-3 mt-5">
          Projects
        </h1>
      ) : (
        <p className="text-center text-xl font-semi-bold">
          No available projects for this cohort
        </p>
      )}
      <div className="flex gap-2 bg-slate-600 px-3 md:p-3 w-fit rounded-full">
        <BsGridFill
          className={`h-[2rem] w-[1rem] md:w-[3rem] cursor-pointer ${
            view === "grid" ? "text-white" : "text-gray-400"
          }`}
          onClick={() => setView("grid")}
        />
        <FaTableList
          className={`h-[2rem] w-[1rem] md:w-[3rem] cursor-pointer ${
            view === "table" ? "text-white" : "text-gray-400"
          }`}
          onClick={() => setView("table")}
        />
      </div>
      <div className="my-3">
        <p>Filter by project Type:</p>
        <select
          className="my-2 rounded-md"
          value={projectType}
          onChange={handleFilter}
        >
          <option value="All">All</option>
          <option value="Android">Android</option>
          <option value="Fullstack">Fullstack</option>
        </select>
      </div>

      {view === "grid" ? (
        <div className="flex flex-wrap gap-2 md:items-center md:justify-center">
          {filteredProjects.map((item) => (
            <Project
              key={item.id}
              id={item.id}
              name={item.name}
              desc={item.description}
              members={item.members}
              git={item.github_link}
              classId={item.class_id}
              deleted={handleDelete}
              stack={item.project_type}
              // isAdmin={isAdmin}
              user={item.user && item.user.first_name}
            />
          ))}
        </div>
      ) : (
        <div className="overflow-auto">
          <table className="table-auto text-sm w-full text-left text-gray-500 dark:text-gray-400">
            <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="th-td">ID</th>
                <th className="th-td">Name</th>
                <th className="th-td">Description</th>
                <th className="th-td">Github</th>
                <th className="th-td">Owner</th>
                <th className="th-td">Members</th>
                <th className="th-td">Project Type</th>
                {localStorage.getItem("role") === "admin" && (
                  <th className="th-td">Action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((item) => (
                <tr key={item.id}>
                  <td className="th-td">{item.id}</td>
                  <td className="th-td">{item.name}</td>
                  <td className="th-td">{item.description}</td>
                  <td className="th-td">{item.github_link}</td>
                  <td className="th-td">{item.user && item.user.first_name}</td>
                  <td className="th-td">{item.members}</td>
                  <td className="th-td">{item.project_type}</td>
                  <td className="th-td">
                    {localStorage.getItem("role") === "admin" && (
                      <button
                        className="bg-red-400 text-white rounded-full px-3 cursor:pointer"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
