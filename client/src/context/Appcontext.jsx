import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [cohort, setCohort] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [originalProjects, setOriginalProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(null);

  const getProjects = async () => {
    try {
      const response = await axios
        .get("http://localhost:5555/projects")
        .then((response) => {
          console.log(response.data);
          setProjects(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getCohort = async () => {
    try {
      const response = await axios
        .get("http://localhost:5555/classes")
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
  }, []);

  return (
    <AppContext.Provider
      value={{
        projects,
        setProjects,
        cohort,
        selectedClass,
        setSelectedClass,
        originalProjects,
        setOriginalProjects,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
