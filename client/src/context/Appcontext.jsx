import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [cohort, setCohort] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [originalProjects, setOriginalProjects] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [loading, setLoading] = useState(null);
  const baseUrl = "https://project-tracker-tvyu.onrender.com";
  // const [isAdmin, setIsAdmin] = useState(null);
  // "https://project-tracker-tvyu.onrender.com";

  useEffect(() => {
    setLoading(true);
    if (projects) {
      setLoading(false);
    }
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(`${baseUrl}/project/${id}`);
      console.log("succesfully deleted item", response.data);
      toast.success("Project deleted succesfully", {
        autoClose: 3000,
        theme: "colored",
      });
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id)
      );
    } catch (error) {
      console.log("Error deleting item", error);
    }
  };

  const getStudents = async () => {
    try {
      const response = await axios
        .get(`${baseUrl}/students`)
        .then((response) => {
          console.log(response.data);
          setStudents(response.data);
        });
    } catch (error) {
      console.log(error, "something went wrong");
    }
  };

  const getProjects = async () => {
    try {
      const response = await axios
        .get(`${baseUrl}/projects`)
        .then((response) => {
          console.log(response.data);
          setProjects(response.data);
        });
    } catch (error) {
      console.log(error, "something went wrong");
    }
  };

  const getCohort = async () => {
    try {
      const response = await axios
        .get(`${baseUrl}/classes`)
        .then((response) => {
          console.log(response.data);
          setCohort(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjects();
    getCohort();
    getStudents();
  }, []);

  return (
    <AppContext.Provider
      value={{
        projects,
        setProjects,
        cohort,
        setCohort,
        selectedClass,
        setSelectedClass,
        originalProjects,
        setOriginalProjects,
        // isAdmin,
        // setIsAdmin,
        handleDelete,
        isLoggedIn,
        setIsLoggedIn,
        students,
        baseUrl,
        toast,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
