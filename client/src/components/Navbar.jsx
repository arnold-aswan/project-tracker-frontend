import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RxHamburgerMenu, RxCrossCircled } from "react-icons/rx";

import { logout } from "../features/users/users";
import project from "../assets/project-management.png";

function Navbar() {
  const [sideBar, setSideBar] = useState(false);

  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { isLoggedIn, toast } = user;

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const handleClick = (e, path, allowedRoles) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate("/login");
    } else {
      const userRole = localStorage.getItem("role");
      if (allowedRoles.includes(userRole)) {
        navigate(path);
      } else {
        e.preventDefault();
        toast.info("You don't have the required permissions for this action.", {
          autoclose: 3000,
          theme: "colored",
        });
      }
    }
  };
  return (
    <>
      <nav
        className="border-2 border-slate-100 py-3 px-4 
      rounded-md shadow-lg flex items-center justify-between mb-10">
        <NavLink to="/" className="cursor-pointer">
          <img src={project} alt="" className="w-[2rem]" />
        </NavLink>

        <div className="">
          <RxHamburgerMenu
            className="w-[2rem] h-[1.5rem] z-20 lg:hidden"
            onClick={() => setSideBar(true)}
          />
          <div className="relative">
            <ul
              className={
                sideBar
                  ? `lg:flex lg:gap-5 flex flex-col h-screen w-[15rem] fixed top-0 right-0 z-10 bg-white shadow-lg px-5 pt-[4rem]`
                  : "hidden lg:flex lg:gap-3"
              }>
              <li>
                <RxCrossCircled
                  className="text-2xl text-red-600 absolute top-8 left-[1rem] cursor-pointer z-30 lg:hidden"
                  onClick={() => setSideBar(false)}
                />
              </li>
              {isLoggedIn ? (
                <li className="cursor-pointer md:text-[.9rem] hover:bg-red-500 hover:text-white rounded-md p-2 ">
                  <button onClick={handleLogout}>Logout</button>
                </li>
              ) : (
                <li className="nav-links">
                  <NavLink to="/login">
                    {/* {localStorage.getItem("refreshToken") ? "Logout" : "Login"} */}
                    Login
                  </NavLink>
                </li>
              )}
              <li className="nav-links">
                <NavLink
                  to="/add-project"
                  onClick={(e) =>
                    handleClick(e, "/add-project", ["admin", "student"])
                  }>
                  Add Project
                </NavLink>
              </li>
              {localStorage.getItem("role") === "admin" && (
                <li className="nav-links">
                  <NavLink
                    to="/add-cohort"
                    onClick={(e) => handleClick(e, "/add-cohort", "admin")}>
                    Add Cohorts
                  </NavLink>
                </li>
              )}
              <li className="nav-links">
                <NavLink
                  to="/cohorts"
                  onClick={(e) =>
                    handleClick(e, "/cohorts", ["admin", "student"])
                  }>
                  Projects/Cohorts
                </NavLink>
              </li>
              <li className="nav-links">
                <NavLink to="/about">About Us</NavLink>
              </li>
              <li className="nav-links">
                <NavLink to="/contact">Contact Us</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
