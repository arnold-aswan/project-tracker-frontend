import { useContext, useState, useEffect } from "react";
import AppContext from "../context/Appcontext";
import Project from "../components/Project";
import { BsGridFill } from "react-icons/bs";
import { FaTableList } from "react-icons/fa6";

export default function Projects() {
  const { projects, selectedClass, isAdmin } = useContext(AppContext);
  const [view, setView] = useState("grid");
  // console.log(projects);

  const originalProjects = projects;
  const [filteredProjects, setFilteredProjects] = useState(originalProjects);

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

  const handleDelete = (id) => {
    console.log(id);
  };

  return (
    <>
      <div className="flex gap-2 bg-slate-600 p-3 w-fit rounded-full">
        <BsGridFill
          className={`h-[2rem] w-[3rem] cursor-pointer ${
            view === "grid" ? "text-white" : "text-gray-400"
          }`}
          onClick={() => setView("grid")}
        />
        <FaTableList
          className={`h-[2rem] w-[3rem] cursor-pointer ${
            view === "table" ? "text-white" : "text-gray-400"
          }`}
          onClick={() => setView("table")}
        />
      </div>

      {view === "grid" ? (
        <div className="flex flex-wrap gap-10">
          {filteredProjects.map((item) => (
            <Project
              id={item.id}
              key={item.id}
              name={item.name}
              desc={item.description}
              members={item.users}
              git={item.github_link}
              classId={item.class_id}
              deleted={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div>
          <table className="table-auto w-full text-left text-gray-500 dark:text-gray-400">
            <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-2 py-4">ID</th>
                <th className="px-2 py-4">Name</th>
                <th className="px-2 py-4">Description</th>
                <th className="px-2 py-4">Github</th>
                <th className="px-2 py-4">Members</th>
                {isAdmin && <th className="px-2 py-4">Action</th>}
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((item) => (
                <tr key={item.id}>
                  <td className="px-2 py-4">{item.id}</td>
                  <td className="px-2 py-4">{item.name}</td>
                  <td className="px-2 py-4">{item.description}</td>
                  <td className="px-2 py-4">{item.github_link}</td>
                  <td className="px-2 py-4">{item.memebers}</td>
                  <td className="px-2 py-4">
                    {isAdmin && (
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
