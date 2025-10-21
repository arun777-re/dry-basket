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

const RegisterForm = () => {
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
          toast.success("Registration successful! Please login.");
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
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200 py-10 px-0">
      <div
        className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl 
        rounded-3xl p-8 sm:p-10 border border-gray-100 transition-all duration-300"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-6">
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
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={values.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={`w-full py-3 px-5 bg-white border ${
                    touched.firstName && errors.firstName
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-full text-gray-700 focus:ring-2 focus:ring-first focus:border-first transition`}
                />
                {touched.firstName && errors.firstName && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={values.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={`w-full py-3 px-5 bg-white border ${
                    touched.lastName && errors.lastName
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-full text-gray-700 focus:ring-2 focus:ring-first focus:border-first transition`}
                />
                {touched.lastName && errors.lastName && (
                  <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email: name@example.com"
                  name="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={`w-full py-3 px-5 bg-white border ${
                    touched.email && errors.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-full text-gray-700 focus:ring-2 focus:ring-first focus:border-first transition`}
                />
                {touched.email && errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <input
                  type="password"
                  placeholder="Password: Asdf@123"
                  name="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={`w-full py-3 px-5 bg-white border ${
                    touched.password && errors.password
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-full text-gray-700 focus:ring-2 focus:ring-first focus:border-first transition`}
                />
                {touched.password && errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 mt-2 bg-first text-white font-medium 
                rounded-full shadow-md hover:bg-head transition duration-300"
              >
                Sign Up
              </button>

              {/* Redirect */}
              <p className="text-sm text-gray-600 text-center mt-4">
                Already have an account?{" "}
                <span
                  onClick={() => router.push(ROUTES.USER_LOGIN)}
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
