import "./App.css";
import { Route, Routes, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddCohort from "./components/AddCohort";
import AddProject from "./components/AddProject";
import Cohorts from "./components/Cohorts";
import Contact from "./components/ContactUs";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import AuthComponent from "./components/AuthComponent";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <main className="">
      <Navbar />
      <Outlet />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cohorts" element={<Cohorts />} />
        <Route
          path="/add-cohort"
          element={<ProtectedRoute element={<AddCohort />} role={"admin"} />}
        />

        {/* <Route path="/add-cohort" element={<AddCohort />} /> */}
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login/*" element={<AuthComponent />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </main>
  );
}

export default App;
