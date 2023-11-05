import { useContext } from "react";
import AppContext from "../context/Appcontext";
import CohortCard from "./CohortCard";
import Projects from "./Projects";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

export default function Cohorts() {
  const { cohort, selectedClass, setSelectedClass, loading } =
    useContext(AppContext);
  //   console.log(projects);

  const handleViewProjects = (classId) => setSelectedClass(classId);

  return (
    <>
      <h1 className="py-4 text-center font-semibold text-2xl">Cohorts</h1>
      {loading ? (
        <div className="max-w-[7rem] mx-auto">
          <ClimbingBoxLoader
            color={"#000000"}
            loading={loading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="flex gap-4 flex-wrap md:items-center md:justify-center">
          {cohort.map((item) => (
            <CohortCard
              key={item.id}
              classId={item.id}
              title={item.name}
              viewProjects={handleViewProjects}
            />
          ))}
        </div>
      )}
      <Projects />
    </>
  );
}
