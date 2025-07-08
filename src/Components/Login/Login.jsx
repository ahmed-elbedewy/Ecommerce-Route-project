import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../Contexts/AuthContextProvider";

export default function Login() {
  const navigate = useNavigate();
  const loginData = {
    email: "",
    password: "",
  };
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(AuthContext);
  const loginFormik = useFormik({
    initialValues: loginData,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        console.log(values);
        const { data } = await axios.post(
          " https://ecommerce.routemisr.com/api/v1/auth/signin",
          values
        );
        console.log(data.token, data.user, data.message);
        toast.success("Login successful!");
        setToken(data.token);
        navigate("/");
      } catch (error) {
        console.log("Login error:", error?.response?.data?.message);
        toast.error(
          error?.response?.data?.message ||
            "Login failed. Please check your credentials and try again."
        );
      }
      setLoading(false);
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
      return errors;
    },
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: false,
  });

  return (
    <>
      <div className="min-h-screen flex items-center justify-center  px-4 w-full">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">Please sign in to your account</p>
          </div>

          <form className="space-y-6" onSubmit={loginFormik.handleSubmit}>
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
                name="email"
                autoComplete="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors outline-none"
                onChange={loginFormik.handleChange}
                value={loginFormik.values.email}
                onBlur={loginFormik.handleBlur}
              />

              {loginFormik.errors.email && loginFormik.touched.email && (
                <div className="text-red-500 text-sm mt-1">
                  {loginFormik.errors.email}
                </div>
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
                onChange={loginFormik.handleChange}
                value={loginFormik.values.password}
                name="password"
                autoComplete="current-password"
                onBlur={loginFormik.handleBlur}
              />
              {loginFormik.errors.password && loginFormik.touched.password && (
                <div className="text-red-500 text-sm mt-1">
                  {loginFormik.errors.password}
                </div>
              )}
            </div>

            <button
              className={`w-full py-3 px-4 rounded-lg focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium flex justify-center items-center ${
                loading || !loginFormik.isValid
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
              type="submit"
              disabled={loading || !loginFormik.isValid}
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

          <div className="text-center">
            <a
              href="#"
              className="text-sm text-indigo-600   hover:text-indigo-500 transition-colors"
            >
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}
