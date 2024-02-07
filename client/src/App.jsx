import { useEffect } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCohorts } from "./features/cohorts/cohort";
import { getProjects } from "./features/projects/project";
import { getStudents } from "./features/users/users";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddCohort from "./pages/AddCohort";
import AddProject from "./pages/AddProject";
import Cohorts from "./pages/Cohorts";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import AuthComponent from "./pages/AuthComponent";
import ProtectedRoute from "./components/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "./App.css";

function App() {
  const projects = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  const { loading } = projects;

  useEffect(() => {
    dispatch(getCohorts());
    dispatch(getStudents());
    if (loading === "idle") {
      dispatch(getProjects());
    }
  }, [loading, dispatch]);

  return (
    <main className="">
      <Navbar />
      <Outlet />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/*" element={<AuthComponent />} />
        <Route path="/cohorts" element={<Cohorts />} />
        <Route
          path="/add-cohort"
          element={<ProtectedRoute element={<AddCohort />} role={"admin"} />}
        />

        <Route path="/add-project" element={<AddProject />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </main>
  );
}

export default App;
