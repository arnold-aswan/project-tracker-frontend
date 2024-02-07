import { useSelector, useDispatch } from "react-redux";
import { selectClass } from "../features/cohorts/cohort";

import CohortCard from "../components/CohortCard";
import Projects from "../components/Projects";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

export default function Cohorts() {
  const cohortItems = useSelector((state) => state.cohorts);
  const dispatch = useDispatch();

  const { classes, loading } = cohortItems;

  const handleViewProjects = (classId) => {
    dispatch(selectClass(classId));
  };

  return (
    <>
      <h1 className="py-4 text-center font-semibold text-2xl">Cohorts</h1>
      {loading === "loading" ? (
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
          {classes?.map((item) => (
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
