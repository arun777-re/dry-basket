"use client";
import React from "react";
import { Formik, FormikHelpers } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Button from "@/app/_components/Button";
import ForgotPass from "./ForgotPass";
import authHook from "@/hooks/authHook";
import { ROUTES } from "@/constants/routes";
import { initialLoginSchema } from "@/app/validation/authValidation";

interface loginProps {
  email: string;
  password: string;
}

const initialLoginValue: loginProps = {
  email: "",
  password: "",
};

type Props = {
  setPage:(page:string)=>void;
};

const LoginForm:React.FC<Props> = ({setPage}) => {
  const [pass, setPass] = React.useState<boolean>(false);
  const redirect = useSearchParams();
  const router = useRouter();
  const { useLoginUser } = authHook();

  const handleLogin = async (
    values: loginProps,
    { resetForm }: FormikHelpers<loginProps>
  ) => {
    try {
      await useLoginUser({
        values,
        route: redirect.get("redirect") || ROUTES.HOME,
      });
      resetForm();
    } catch (err) {
      toast.error("Login Failed");
      router.push("/user/auth-login");
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl px-4 py-8 md:px-8 relative overflow-hidden">
        <h2 className="text-2xl md:text-3xl font-normal text-center mb-6 text-gray-800">
          Welcome Back 👋
        </h2>

        <Formik
          initialValues={initialLoginValue}
          validationSchema={initialLoginSchema}
          onSubmit={handleLogin}
        >
          {({
            values,
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
          }) => (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={`w-full rounded-xl border ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 px-4 py-3 text-sm`}
                />
                {touched.email && errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={`w-full rounded-xl border ${
                    errors.password && touched.password
                      ? "border-red-500"
                      : "border-gray-300"
                  } bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 px-4 py-3 text-sm`}
                />
                {touched.password && errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3 text-sm font-semibold text-white rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Login
              </button>
            </form>
          )}
        </Formik>

        {/* Forgot Password */}
        <div className="text-center mt-5">
          <Button
            type="button"
            onClick={() => setPass(true)}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 underline transition-all duration-300"
          >
            Forgot Password?
          </Button>
           <p className="text-sm text-gray-600 text-center mt-4">
                Already have an account?{" "}
                <span
                  onClick={() => setPage("register")}
                  className="text-first hover:underline cursor-pointer"
                >
                  Sign Up
                </span>
              </p>
        </div>

        {/* Forgot Password Overlay */}
        {pass && (
          <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center">
            <ForgotPass setPass={setPass} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
