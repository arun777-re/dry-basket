"use client";

import React, { useCallback } from "react";
import { Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ROUTES } from "@/constants/routes";
import authHook from "@/hooks/authHook";
import { initialSignUpSchema } from "@/app/validation/authValidation";

interface RegisterProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const initialSignUpValue: RegisterProps = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

type Props = {
  setPage:(page:string)=>void
};
const RegisterForm:React.FC<Props> = ({setPage}) => {
  const { useRegisterUser } = authHook();
  const router = useRouter();

  const handleSignUp = useCallback(
    async (
      values: RegisterProps,
      { resetForm }: FormikHelpers<RegisterProps>
    ) => {
      try {
        const res = await useRegisterUser({
          values,
          route: ROUTES.HOME,
        });

        if (!res) {
          toast.error("No response from server. Please try again later.");
          return;
        }

        if (res.success || res.status === 201) {
          toast.success(res.message || "Check your email!");
          resetForm();
          router.push(ROUTES.USER_LOGIN);
        } else {
          const message =
            res?.message ||
            "Registration failed. Please check your details and try again.";
          toast.error(message);
          console.warn("Registration error:", res);
        }
      } catch (error: any) {
        console.error("Unexpected error during registration:", error);
        toast.error(error?.message || "Something went wrong!");
      }
    },
    [router, useRegisterUser]
  );

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200 py-10 px-4">
      <div
        className="w-full max-w-md bg-white shadow-lg rounded-2xl px-4 py-8 md:px-8 relative overflow-hidden"
      >
        <h2 className="text-2xl sm:text-3xl font-normal text-center text-gray-800 mb-6">
          Create Your Account
        </h2>

        <Formik
          initialValues={initialSignUpValue}
          validationSchema={initialSignUpSchema}
          onSubmit={handleSignUp}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form
              onSubmit={handleSubmit}
              method="POST"
              className="flex flex-col gap-5"
            >
              {/* First Name */}
              <div>
                   <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={values.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={`w-full rounded-xl border ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 px-4 py-3 text-sm`}
                />
                {touched.firstName && errors.firstName && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                 <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={values.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={`w-full rounded-xl border ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 px-4 py-3 text-sm`}
                />
                {touched.lastName && errors.lastName && (
                  <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
                )}
              </div>

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

              <button
                type="submit"
                className="w-full py-3 text-sm font-semibold text-white rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Sign Up
              </button>

              {/* Redirect */}
              <p className="text-sm text-gray-600 text-center mt-4">
                Already have an account?{" "}
                <span
                  onClick={() => setPage("login")}
                  className="text-first hover:underline cursor-pointer"
                >
                  Login here
                </span>
              </p>
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default RegisterForm;
