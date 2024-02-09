import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProject } from "../features/projects/project";

import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import error from "../assets/error.json";
import Lottie from "lottie-react";
import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  Text,
  Card,
  Title,
} from "@tremor/react";
import ModalBox from "./Modal";

export default function Projects() {
  const cohortItems = useSelector((state) => state.cohorts);
  const { selectedClass } = cohortItems;

  // Get projects from the store
  const projects = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  // pull the project properties
  const { loading, error, projectItems } = projects;

  const originalProjects = projectItems;

  // const [view, setView] = useState("grid");
  const [filteredProjects, setFilteredProjects] = useState(originalProjects);
  const [projectType, setProjectType] = useState("All");
  const [open, setOpen] = useState(false);
  const [openModalItem, setOpenModalItem] = useState({});

  const mod = (items) => {
    setOpen(true);
    setOpenModalItem(items);
    // console.log(items);
    return openModalItem;
  };

  const random = ["Pending", "Completed"];

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
        (item) =>
          item.project_type === selected && item.class_id === selectedClass
      );
      setFilteredProjects(filtered);
    }
  };

  const handleProjectDelete = (id) => {
    dispatch(deleteProject(id)).catch((error) => {
      console.error("Delete project failed:", error);
    });
    setOpen(!open);
  };

  return (
    <>
      {projectItems ? (
        <h1 className="text-center text-2xl font-semibold mb-3 mt-16">
          Projects
        </h1>
      ) : (
        <p className="text-center text-xl font-semi-bold">
          No available projects for this cohort
        </p>
      )}
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
        loading === "rejected" ||
        (error && (
          <Lottie animationData={error} className="max-w-[7rem] mx-auto" />
        ))
      )}

      <div className="my-3">
        <p>Filter by project Type:</p>
        <select
          className="my-2 rounded-md"
          value={projectType}
          onChange={handleFilter}>
          <option value="All">All</option>
          <option value="Android">Android</option>
          <option value="Fullstack">Fullstack</option>
        </select>
      </div>

      <div className="overflow-auto border-2 rounded-xl">
        <Card>
          <Title>Projects List</Title>
          <Table className="mt-4">
            <TableHead>
              <TableRow className="font-bold">
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Description</TableHeaderCell>
                <TableHeaderCell>Project Type</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Action</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProjects.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Text>
                      {item.description.slice(0, 50)}
                      {item.description.length > 50 ? "..." : ""}
                    </Text>
                  </TableCell>

                  <TableCell>
                    <Badge
                      className="font-semibold"
                      color={
                        item.project_type === "Android" ? "blue" : "purple"
                      }>
                      {item.project_type}
                      {/* <Text>{item.project_type}</Text> */}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className="font-semibold"
                      color={
                        random[Math.floor(Math.random() * random.length)] ===
                        "Completed"
                          ? "emerald"
                          : "orange"
                      }>
                      {random[Math.floor(Math.random() * random.length)]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <button
                      size="md"
                      onClick={() => mod(item)}
                      className="text-white bg-blue-500 px-4 py-2 font-bold rounded-md">
                      More
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <ModalBox
              setOpen={setOpen}
              open={open}
              item={openModalItem}
              deleteProject={handleProjectDelete}
            />
          </Table>
        </Card>
      </div>
    </>
  );
}
