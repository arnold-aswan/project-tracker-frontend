import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const AddCohort = () => {
  const onSubmit = async (values, actions) => {
    console.log(values, actions);
    // try {
    //   const response = await axios
    //     .post("url", values)
    //     .then((response) => console.log(response, actions));
    //   formik.resetForm();
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const formik = useFormik({
    initialValues: {
      cohortName: "",
      description: "",
    },
    validationSchema: yup.object({
      cohortName: yup
        .string()
        .min(4, "Must be 4 charcters or more")
        .max(10, "Must be 4 - 10 charcaters or less")
        .required("Required"),
      description: yup
        .string()
        .min(5, "Must be 10 characters or more")
        .max(100, "Must be 10 - 100 characters")
        .required("Required"),
    }),
    onSubmit,
  });
  console.log(formik.errors);
  return (
    <div className=" bg-gray-300 flex flex-col justify-center items-center md:p-4">
      <div className="bg-gray-700 sm:w-2/3 md:w-2/3 lg:w-1/2 xl:w-2/5 h-2/5 p-2 md:p-5 flex flex-col rounded-md">
        <h1 className="text-3xl text-gray-300 font-bold text-center mb-8">
          PROJECT TRACKER
        </h1>
        <div className="flex-grow p-2">
          <div className="bg-white px-2 py-3 md:p-4  rounded-lg">
            <h1 className="text-black text-2xl font-bold text-center mb-4">
              Add Cohort
            </h1>
            <form className="mt-4" onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Cohort Name
                </label>
                <input
                  className="rounded bg-blue-300 border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700 py-2 px-4 w-full"
                  type="text"
                  name="cohortName"
                  value={formik.values.cohortName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.cohortName && (
                  <small className="text-red-500">
                    {formik.touched.cohortName && formik.errors.cohortName}
                  </small>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  className="rounded bg-blue-300 border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700 py-2 px-4 w-full"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></textarea>
                {formik.touched.description && formik.errors.description && (
                  <small className="text-red-500">
                    {formik.errors.description}
                  </small>
                )}
              </div>
              <button
                className="bg-blue-500 text-white py-2 px-16 rounded mx-auto block w-full hover:bg-blue-600"
                disabled={formik.isSubmitting}
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCohort;
