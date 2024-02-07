import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import { addProject } from "../features/projects/project";


const AddProject = () => {
  const cohortItems = useSelector((state) => state.cohorts);
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const { classes } = cohortItems;
  const { students } = users;

  // const { students } = useContext(AppContext);
  const usr_id = localStorage.getItem("user_id");

  const onSubmit = async (values) => {
    try {
      dispatch(addProject(values));
      formik.resetForm();
    } catch (error) {
      throw new Error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      class_id: "",
      project_type: "",
      name: "",
      description: "",
      user_id: usr_id,
      memebers: [],

      github_link: "",
    },
    validationSchema: yup.object({
      class_id: yup.number().integer().required("Required"),
      project_type: yup.string().required("Required"),
      name: yup
        .string()
        .required("Required")
        .min(5, "Must be atleast 5 characters long")
        .max(30, "must be between 10 - 30 characters long"),
      description: yup
        .string()
        .required("Required")
        .min(5, "Must be 5 characters or more")
        .max(100, "Must be 10 - 100 characters"),
      github_link: yup.string().required("Required"),
      user_id: yup.number().required("Required"),
      // user_id: userId,
      memebers: yup.array().min(1, "At least one member must be selected"),
      // memebers: yup.string().required("Required"),
    }),
    onSubmit,
  });

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center md:p-4 rounded-md">
      <div className="bg-gray-700 sm:w-2/3 md:w-[25rem] lg:w-[30rem] p-4 rounded-lg ">
        <h1 className="text-3xl text-gray-300 font-bold text-center mb-8">
          PROJECT TRACKER
        </h1>
        <div className="bg-white rounded-lg p-3 md:px-1">
          <h1 className="text-black text-2xl font-bold text-center mb-4">
            Add Project
          </h1>
          <form className="sm:p-3" onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label className="block  text-sm font-bold mb-2">
                Select Class
              </label>
              <select
                className="p-2 rounded w-full"
                name="class_id"
                value={formik.values.class_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}>
                <option defaultValue={"select"}>select</option>
                {classes?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {formik.errors.class_id && (
                <small className="text-red-500">
                  {formik.touched.class_id && formik.errors.class_id}
                </small>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Project Type
              </label>
              <select
                className="p-2 rounded w-full"
                name="project_type"
                value={formik.values.project_type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}>
                <option defaultValue="select">select</option>
                <option value="Fullstack">Fullstack</option>
                <option value="Android">Android</option>
              </select>
              {formik.errors.project_type && (
                <small className="text-red-500">
                  {formik.touched.project_type && formik.errors.project_type}
                </small>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Project Name
              </label>
              <input
                className="rounded border-2 border-gray-300 focus:outline-none focus:border-blue-500  py-2 px-4 w-full"
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && (
                <small className="text-red-500">
                  {formik.touched.name && formik.errors.name}
                </small>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Project Description
              </label>
              <textarea
                className="rounded border-2 border-gray-300 focus:outline-none focus:border-blue-500  py-2 px-4 w-full"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}></textarea>
              {formik.errors.description && (
                <small className="text-red-500">
                  {formik.touched.description && formik.errors.description}
                </small>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Team Leader
              </label>
              <select
                className="p-2 rounded w-full"
                name="user_id"
                value={formik.values.user_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}>
                <option value="select">select</option>
                {students.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.first_name}
                  </option>
                ))}
              </select>
              {formik.errors.user_id && (
                <small className="text-red-500">
                  {formik.touched.user_id && formik.errors.user_id}
                </small>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Team Members
              </label>

              <select
                className="rounded border-2 border-gray-300 focus:outline-none focus:border-blue-500  py-2 px-4 w-full"
                name="memebers"
                value={formik.values.memebers}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                multiple>
                {students.map((item) => (
                  <option key={item.id} value={item.first_name}>
                    {item.first_name}
                  </option>
                ))}
              </select>

              {formik.errors.memebers && (
                <small className="text-red-500">
                  {formik.touched.memebers && formik.errors.memebers}
                </small>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                GitHub Link
              </label>
              <input
                className="rounded border-2 border-gray-300 focus:outline-none focus:border-blue-500  py-2 px-4 w-full"
                type="text"
                name="github_link"
                value={formik.values.github_link}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.github_link && (
                <small className="text-red-500">
                  {formik.touched.github_link && formik.errors.github_link}
                </small>
              )}
              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white py-2 px-16 rounded mx-auto block w-full hover:bg-blue-600"
                  type="submit">
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
