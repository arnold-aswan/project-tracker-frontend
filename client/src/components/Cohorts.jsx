import { useContext } from "react";
import AppContext from "../context/Appcontext";
import CohortCard from "./CohortCard";
import Projects from "./Projects";

export default function Cohorts() {
  const { cohort, selectedClass, setSelectedClass } = useContext(AppContext);
  //   console.log(projects);

  const handleViewProjects = (classId) => setSelectedClass(classId);
  console.log(selectedClass);
  return (
    <>
      <h1 className="py-4 text-center font-semibold text-2xl">Cohorts</h1>
      <div className="flex gap-4 flex-wrap">
        {cohort.map((item) => (
          <CohortCard
            key={item.id}
            classId={item.id}
            title={item.name}
            viewProjects={handleViewProjects}
          />
        ))}
      </div>
      <Projects />
    </>
  );
}
