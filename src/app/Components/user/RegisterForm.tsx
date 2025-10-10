"use client";

import React, { useCallback } from "react";
import { Formik, FormikHelpers } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { ROUTES } from "@/constants/routes";
import authHook from "@/hooks/authHook";
import { initialSignUpSchema } from "@/app/validation/authValidation";

interface registerProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const initialSignUpValue: registerProps = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const RegisterForm = () => {
  const redirect = useSearchParams();

  // authentication hook for dispatch thunks
  const { useRegisterUser } = authHook();

  const router = useRouter();

  const handleSignUp = useCallback(
    async (
      values: registerProps,
      { resetForm }: FormikHelpers<registerProps>
    ) => {
      try {
        useRegisterUser({
          values,
          route:`${ROUTES.HOME}`,
        });
        toast.success("Signup successfull");
        resetForm();
      } catch (error: any) {
        toast.error(error.message);
        router.push(`${ROUTES.USER_LOGIN}`);
      }
    },
    []
  );

  return (
    <div className="w-full relative bg-gray-100 shadow-md py-10">
      <Formik
        initialValues={initialSignUpValue}
        validationSchema={initialSignUpSchema}
        onSubmit={handleSignUp}
        className={"relative w-full"}
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
            className="relative w-full  flex flex-col px-4 z-20 
              items-center justify-center gap-5"
          >
            <div className="relative w-full h-auto flex flex-col items-start gap-5 md:px-10 z-40">
              <input
                type="text"
                placeholder="Fistname"
                name="firstName"
                value={values.firstName}
                onBlur={handleBlur}
                onChange={handleChange}
                className="w-full py-3 px-6 focus:outline-head outline-1 border-transparent bg-white rounded-full placeholder:text-sm"
              />
              {touched.firstName && errors.firstName && (
                <div className="text-red-500 text-sm">{errors.firstName}</div>
              )}
              <input
                type="text"
                placeholder="LastName"
                name="lastName"
                value={values.lastName}
                onBlur={handleBlur}
                onChange={handleChange}
                className="w-full py-3 px-6 focus:outline-head  outline-1 border-transparent bg-white rounded-full placeholder:text-sm"
              />
              {touched.lastName && errors.lastName && (
                <div className="text-red-500 text-sm">{errors.lastName}</div>
              )}
              <input
                type="email"
                placeholder="Email:name@example.com"
                name="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                className="w-full py-3 px-6 focus:outline-head  outline-1 border-transparent bg-white rounded-full placeholder:text-sm"
              />
              {touched.email && errors.email && (
                <div className="text-red-500 text-sm">{errors.email}</div>
              )}
              <input
                type="password"
                placeholder="Password:Asdf@123"
                name="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                className="w-full py-3 px-6 focus:outline-head  outline-1 border-transparent bg-white rounded-full placeholder:text-sm"
              />
              {touched.password && errors.password && (
                <div className="text-red-500 text-sm">{errors.password}</div>
              )}

              <button
                type="submit"
                className="px-6 py-3 flex items-center justify-center border-2 border-head hover:border-first
            rounded-full cursor-pointer hover:bg-first transition-colors duration-300 bg-transparent  font-medium"
              >
                <p className="text-body text-sm">SignUp</p>
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
