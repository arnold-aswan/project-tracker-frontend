import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import AppContext from "../context/Appcontext";

function AuthComponent() {
  const { baseUrl, setIsLoggedIn, toast } = useContext(AppContext);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(formikLogin.values);

    try {
      const response = await axios.post(`${baseUrl}/login`, formikLogin.values);
      // console.log(email, password, role);
      console.log(response);
      localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("refreshToken", response.data.refresh_token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("user_id", response.data.user_id);
      response.data.access_token ? setIsLoggedIn(true) : setIsLoggedIn(false);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      if (error) {
        toast.error(error.response.data.message, {
          autoclose: 3000,
          theme: "colored",
        });
      }
    }
  };

  const handleRegistration = async (event) => {
    event.preventDefault();
    console.log(formikSignup.values);

    try {
      const response = await axios.post(
        `${baseUrl}/signUp`,
        formikSignup.values
      );
      console.log(response);

      setIsLoginForm(true);
      formikSignup.values = formikSignup.initialValues;
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

  const LoginSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup.string().required("A password is required"),
    role: yup.string().required("Select a role"),
  });

  const SignupSchema = yup.object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    username: yup.string().required("User name is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
    role: yup.string().required("Select a role"),
  });

  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "",
    },
    validationSchema: LoginSchema,
    onSubmit: handleLogin,
  });

  const formikSignup = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: SignupSchema,
  });

  return (
    <div className="min-h-screen  bg-slate-100 flex justify-center items-center md:p-4 rounded-md">
      <div className="bg-gray-700 sm:w-2/3 md:w-[25rem] lg:w-[27rem]  p-4 rounded-lg">
        <h1 className="text-2xl font-semibold text-blue-600">
          {isLoginForm ? "Login" : "Sign Up"}
        </h1>
        {isLoginForm ? (
          <form className="text-left" onSubmit={formikLogin.handleSubmit}>
            <div className="input-container">
              <label htmlFor="email" className="text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@email.com"
                required
                onChange={formikLogin.handleChange}
                value={formikLogin.values.email}
                onBlur={formikLogin.handleBlur}
                className="w-full p-2 border rounded border-blue-200 mb-2"
              />
              {formikLogin.errors.email && (
                <small className="text-red-500">
                  {formikLogin.touched.email && formikLogin.errors.email}
                </small>
              )}
            </div>
            <div className="input-container">
              <label htmlFor="password" className="text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
                onChange={formikLogin.handleChange}
                value={formikLogin.values.password}
                onBlur={formikLogin.handleBlur}
                className="w-full p-2 border rounded border-blue-200 mb-2"
              />
              {formikLogin.errors.password && (
                <small className="text-red-500">
                  {formikLogin.touched.password && formikLogin.errors.password}
                </small>
              )}
            </div>
            <div className="input-container mt-3 flex flex-col">
              <label htmlFor="role" className="text-white">
                Role
              </label>
              <select
                className="p-2 rounded-md w-full"
                id="role"
                name="role"
                value={formikLogin.values.role}
                onChange={formikLogin.handleChange}
                onBlur={formikLogin.handleBlur}>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
              {formikLogin.errors.role && (
                <small className="text-red-500">
                  {formikLogin.touched.role && formikLogin.errors.role}
                </small>
              )}
            </div>
            <button
              className="bg-blue-600 text-white rounded-md py-2 px-4 text-lg font-semibold mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="submit">
              Login
            </button>
          </form>
        ) : (
          <form className="text-left" onSubmit={handleRegistration}>
            {/* Input fields and labels for registration */}
            <div className="input-container">
              <label htmlFor="first_name" className="text-white">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="First Name"
                required
                onChange={formikSignup.handleChange}
                value={formikSignup.values.first_name}
                onBlur={formikSignup.handleBlur}
                className="w-full p-2 border rounded border-blue-200 mb-2"
              />
              {formikSignup.errors.first_name ? (
                <small className="text-red-500">
                  {formikSignup.touched.first_name &&
                    formikSignup.errors.first_name}
                </small>
              ) : null}
            </div>
            <div className="input-container">
              <label htmlFor="last_name" className="text-white">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Last Name"
                required
                onChange={formikSignup.handleChange}
                value={formikSignup.values.last_name}
                onBlur={formikSignup.handleBlur}
                className="w-full p-2 border rounded border-blue-200 mb-2"
              />
              {formikSignup.errors.last_name && (
                <small className="text-red-500">
                  {formikSignup.touched.last_name &&
                    formikSignup.errors.last_name}
                </small>
              )}
            </div>
            <div className="input-container">
              <label htmlFor="username" className="text-white">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                required
                onChange={formikSignup.handleChange}
                value={formikSignup.values.username}
                onBlur={formikSignup.handleBlur}
                className="w-full p-2 border rounded border-blue-200 mb-2"
              />
              {formikSignup.errors.username && (
                <small className="text-red-500">
                  {formikSignup.touched.username &&
                    formikSignup.errors.username}
                </small>
              )}
            </div>
            <div className="input-container">
              <label htmlFor="email" className="text-white">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="example@email.com"
                required
                onChange={formikSignup.handleChange}
                value={formikSignup.values.email}
                onBlur={formikSignup.handleBlur}
                className="w-full p-2 border rounded border-blue-200 mb-2"
              />
              {formikSignup.errors.email && (
                <small className="text-red-500">
                  {formikSignup.touched.email && formikSignup.errors.email}
                </small>
              )}
            </div>
            <div className="input-container">
              <label htmlFor="password" className="text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
                onChange={formikSignup.handleChange}
                value={formikSignup.values.password}
                onBlur={formikSignup.handleBlur}
                className="w-full p-2 border rounded border-blue-200 mb-2"
              />
              {formikSignup.errors.password && (
                <small className="text-red-500">
                  {formikSignup.touched.password &&
                    formikSignup.errors.password}
                </small>
              )}
            </div>
            <div className="input-container mt-3 flex flex-col">
              <label htmlFor="role" className="text-white">
                Role
              </label>
              <select
                className="p-2 rounded-md"
                id="role"
                name="role"
                value={formikSignup.values.role}
                onChange={formikSignup.handleChange}
                onBlur={formikSignup.handleBlur}>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
              {formikSignup.errors.role && (
                <small className="text-red-500">
                  {formikSignup.touched.role && formikSignup.errors.role}
                </small>
              )}
            </div>
            <button
              className="bg-blue-600 text-white rounded-md py-2 px-4 text-lg font-semibold mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="submit">
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
