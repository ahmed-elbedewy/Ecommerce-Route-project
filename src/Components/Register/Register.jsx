import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InfinitySpin } from "react-loader-spinner";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  phone: Yup.string()
    .matches(
      /^01[0125][0-9]{8}$/,
      "Phone number must be a valid Egyptian phone number (01XXXXXXXXX)"
    )
    .required("Phone number is required"),
});

export default function Register() {
  const navigate = useNavigate();
  const registerData = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  const [loading, setLoading] = useState(false);

  const RegisterFromik = useFormik({
    initialValues: registerData,
    onSubmit: async (values) => {
      console.log("Form submitted:", values);
      setLoading(true);
      try {
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signup",
          values
        );
        console.log("Registration successful:", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        // Redirect to login page after successful registration
        toast.success("Registration successful!");
        // Redirect to home page after 3 seconds
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        console.error("Registration error:", error?.response?.data?.message);
        toast.error(
          error?.response?.data?.message ||
            "Registration failed. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: false,
  });

  return (
    <>
      <div className="min-h-screen flex items-center justify-center  px-4 w-full">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">Please register to get started</p>
          </div>

          <form className="space-y-6" onSubmit={RegisterFromik.handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors outline-none"
                value={RegisterFromik.values.name}
                onChange={RegisterFromik.handleChange}
                name="name"
                onBlur={RegisterFromik.handleBlur}
              />
              {RegisterFromik.touched.name && RegisterFromik.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {RegisterFromik.errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors outline-none"
                value={RegisterFromik.values.email}
                onChange={RegisterFromik.handleChange}
                onBlur={RegisterFromik.handleBlur}
                name="email"
              />
              {RegisterFromik.touched.email && RegisterFromik.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {RegisterFromik.errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors outline-none"
                value={RegisterFromik.values.password}
                name="password"
                onChange={RegisterFromik.handleChange}
                onBlur={RegisterFromik.handleBlur}
              />
              {RegisterFromik.touched.password &&
                RegisterFromik.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {RegisterFromik.errors.password}
                  </p>
                )}
            </div>

            <div>
              <label
                htmlFor="rePassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <input
                id="rePassword"
                type="password"
                placeholder="Confirm your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors outline-none"
                value={RegisterFromik.values.rePassword}
                name="rePassword"
                onChange={RegisterFromik.handleChange}
                onBlur={RegisterFromik.handleBlur}
              />
              {RegisterFromik.touched.rePassword &&
                RegisterFromik.errors.rePassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {RegisterFromik.errors.rePassword}
                  </p>
                )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors outline-none"
                value={RegisterFromik.values.phone}
                name="phone"
                onChange={RegisterFromik.handleChange}
                onBlur={RegisterFromik.handleBlur}
              />
              {RegisterFromik.touched.phone && RegisterFromik.errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {RegisterFromik.errors.phone}
                </p>
              )}
            </div>

            <button
              className={`w-full py-3 px-4 rounded-lg focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium flex justify-center items-center ${
                loading || !RegisterFromik.isValid
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
              type="submit"
              disabled={loading || !RegisterFromik.isValid}
            >
              {loading ? (
                <>
                  <InfinitySpin width="60" color="green" />
                  <span className="ms-3"> Signing in ... </span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}
