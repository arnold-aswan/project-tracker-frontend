import { React, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/Appcontext";

function AuthComponent() {
  const { baseUrl, setIsLoggedIn, toast } = useContext(AppContext);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("l-role").value;

    try {
      const response = await axios.post(`${baseUrl}/login`, {
        email,
        password,
        role,
      });
      console.log(email, password, role);
      console.log(response);
      localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("refreshToken", response.data.refresh_token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("user_id", response.data.user_id);
      response.data.access_token ? setIsLoggedIn(true) : setIsLoggedIn(false);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } catch (error) {
      // console.log(email, password, role);
      console.error("Error logging in:", error);
      if (error) {
        toast.error(error.response.data.message, {
          autoclose: 3000,
          theme: "colored",
        });
      }
    }
  };

  const handleRegistration = (event) => {
    event.preventDefault();
    const first_name = document.getElementById("firstName").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const last_name = document.getElementById("lastName").value;
    const role = document.getElementById("role").value;

    try {
      const response = axios.post(`${baseUrl}/signUp`, {
        first_name,
        last_name,
        username,
        email,
        password,
        role,
      });
      console.log(response);
      // console.log(first_name, last_name, username, email, password, role);
      setIsLoginForm(true);
    } catch (error) {
      console.error("Error registering:", error);
      if (error) {
        toast.error(error.response.data.message, {
          autoclose: 3000,
          theme: "colored",
        });
      }
    }
  };

  return (
    <div className="min-h-screen  bg-slate-100 flex justify-center items-center md:p-4 rounded-md">
      <div className="bg-gray-700 sm:w-2/3 md:w-[25rem] lg:w-[27rem]  p-4 rounded-lg">
        <h1 className="text-2xl font-semibold text-blue-600">
          {isLoginForm ? "Login" : "Sign Up"}
        </h1>
        {isLoginForm ? (
          <form className="text-left" onSubmit={handleSubmit}>
            <div className="input-container">
              <label htmlFor="email" className="text-white">
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Email"
                required
                className="w-full p-2 border rounded border-blue-200 mb-2"
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                className="w-full p-2 border rounded border-blue-200 mb-2"
              />
            </div>
            <div className="input-container mt-3 flex flex-col">
              <label htmlFor="role" className="text-white">
                Role
              </label>
              <select className="p-2 rounded-md w-full" id="l-role">
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              className="bg-blue-600 text-white rounded-md py-2 px-4 text-lg font-semibold mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="submit"
            >
              Login
            </button>
          </form>
        ) : (
          <form className="text-left" onSubmit={handleRegistration}>
            {/* Input fields and labels for registration */}
            <div className="input-container">
              <label htmlFor="firstName" className="text-white">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                required
                className="w-full p-2 border rounded border-blue-200 mb-2"
              />
            </div>
            <div className="input-container">
              <label htmlFor="lastName" className="text-white">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                required
                className="w-full p-2 border rounded border-blue-200 mb-2"
              />
            </div>
            <div className="input-container">
              <label htmlFor="username" className="text-white">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                required
                className="w-full p-2 border rounded border-blue-200 mb-2"
              />
            </div>
            <div className="input-container">
              <label htmlFor="signup-email" className="text-white">
                Email
              </label>
              <input
                type="text"
                id="signup-email"
                placeholder="Email"
                required
                className="w-full p-2 border rounded border-blue-200 mb-2"
              />
            </div>
            <div className="input-container">
              <label htmlFor="signup-password" className="text-white">
                Password
              </label>
              <input
                type="password"
                id="signup-password"
                placeholder="Password"
                required
                className="w-full p-2 border rounded border-blue-200 mb-2"
              />
            </div>
            <div className="input-container mt-3 flex flex-col">
              <label htmlFor="role" className="text-white">
                Role
              </label>
              <select className="p-2 rounded-md" id="role">
                <option value="student" defaultValue={"student"}>
                  Student
                </option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              className="bg-blue-600 text-white rounded-md py-2 px-4 text-lg font-semibold mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        )}
        <p className="text-white">
          {isLoginForm
            ? "Don't have an account? "
            : "Already have an account? "}
          <span className="text-blue-600 cursor-pointer" onClick={toggleForm}>
            Sign {isLoginForm ? "up" : "in"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthComponent;
