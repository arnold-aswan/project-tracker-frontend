import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useContext } from "react";
import AppContext from "../context/Appcontext";


const AddCohort = () => {
  const { baseUrl, cohort, setCohort, toast } = useContext(AppContext);
  const ad_id = localStorage.getItem("user_id");
  // console.log(admin_id);

  const onSubmit = async (values) => {
    console.log(values);
    try {
      const response = await axios.post(`${baseUrl}/classes`, values);
      console.log(response, "succesfully created class");
      toast.success("New class added succesfully", {
        autoClose: 3000,
        theme: "colored",
      });
      setCohort([response.data, ...cohort]);
      formik.resetForm();
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      // description: "",
      admin_id: ad_id,
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .min(4, "Must be 4 charcters or more")
        .max(10, "Must be 4 - 10 charcaters or less")
        .required("Required"),
      admin_id: yup.number(),
      // description: yup
      //   .string()
      //   .min(5, "Must be 10 characters or more")
      //   .max(100, "Must be 10 - 100 characters")
      //   .required("Required"),
    }),
    onSubmit,
  });
  console.log(formik.errors);
  return (
    <div className=" bg-slate-100 flex flex-col justify-center items-center md:p-4 rounded-md">
      <div className="bg-gray-700 max-h-screen sm:w-2/3 md:w-[25rem] lg:w-[27rem] h-2/5 p-2 md:p-5 flex flex-col rounded-md">
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
                <label className="block text-sm font-bold mb-2">
                  Cohort Name
                </label>
                <input
                  className="rounded border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700 py-2 px-4 w-full"
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
              {/* <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  className="rounded border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700 py-2 px-4 w-full"
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
              </div> */}
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
