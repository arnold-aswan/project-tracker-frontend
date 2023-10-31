import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const AddProject = () => {
  const formik = useFormik({
    initialValues: {
      class: "",
      projectType: "",
      projectName: "",
      projectDescription: "",
      teamLeader: "",
      members: [],
      githubLink: "",
    },
    validationSchema: yup.object({
      class: yup.string().required("Required"),
      projectType: yup.string().required("Required"),
      projectName: yup
        .string()
        .required("Required")
        .min(5, "Must be atleast 5 characters long")
        .max(30, "must be between 10 - 30 characters long"),
      projectDescription: yup
        .string()
        .required("Required")
        .min(5, "Must be 5 characters or more")
        .max(100, "Must be 10 - 100 characters"),
      githubLink: yup.string().required("Required"),
      teamLeader: yup.string().required("Required"),
      members: yup.array(),
    }),
  });
  return (
    <div className="min-h-screen bg-gray-300 flex justify-center items-center md:p-4">
      <div className="bg-gray-700 sm:w-2/3 md:w-2/3 lg:w-2/3 xl:w-1/2 p-4 rounded-lg ">
        <h1 className="text-3xl text-gray-300 font-bold text-center mb-8">
          PROJECT TRACKER
        </h1>
        <div className="bg-white rounded-lg p-3 md:px-1">
          <h1 className="text-black text-2xl font-bold text-center mb-4">
            Add Project
          </h1>
          <form className="sm:p-3">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Class
              </label>
              <select
                className="bg-blue-300 text-blue-800 p-2 rounded w-auto"
                name="class"
                value={formik.values.class}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="class1">Cohort 1</option>
                <option value="class2">Cohort 2</option>
              </select>
              {formik.errors.class && (
                <small className="text-red-500">
                  {formik.touched.class && formik.errors.class}
                </small>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Project Type
              </label>
              <select
                className="bg-blue-300 text-blue-800 p-2 rounded w-auto"
                name="projectType"
                value={formik.values.projectType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="Fullstack">Fullstack</option>
                <option value="Android">Android</option>
              </select>
              {formik.errors.projectType && (
                <small className="text-red-500">
                  {formik.touched.projectType && formik.errors.projectType}
                </small>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Project Name
              </label>
              <input
                className="rounded bg-blue-300 border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700 py-2 px-4 w-full"
                type="text"
                name="projectName"
                value={formik.values.projectName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.projectName && (
                <small className="text-red-500">
                  {formik.touched.projectName && formik.errors.projectName}
                </small>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Project Description
              </label>
              <textarea
                className="rounded bg-blue-300 border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700 py-2 px-4 w-full"
                name="projectDescription"
                value={formik.values.projectDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              {formik.errors.projectDescription && (
                <small className="text-red-500">
                  {formik.touched.projectDescription &&
                    formik.errors.projectDescription}
                </small>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Team Leader
              </label>
              <select
                className="bg-blue-300 text-blue-800 p-2 rounded w-full"
                name="teamLeader"
                value={formik.values.teamLeader}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="teamLeader1">Team Leader 1</option>
                <option value="teamLeader2">Team Leader 2</option>
              </select>
              {formik.errors.teamLeader && (
                <small className="text-red-500">
                  {formik.touched.teamLeader && formik.errors.teamLeader}
                </small>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Team Members
              </label>
              <input
                className="rounded bg-blue-300 border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700 py-2 px-4 w-full"
                type="text"
                name="teamMembers"
                value={formik.values.members}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.members && (
                <small className="text-red-500">
                  {formik.touched.members && formik.errors.members}
                </small>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                GitHub Link
              </label>
              <input
                className="rounded bg-blue-300 border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700 py-2 px-4 w-full"
                type="text"
                name="githubLink"
                value={formik.values.githubLink}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.githubLink && (
                <small className="text-red-500">
                  {formik.touched.githubLink && formik.errors.githubLink}
                </small>
              )}
              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white py-2 px-16 rounded mx-auto block w-full hover:bg-blue-600"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
