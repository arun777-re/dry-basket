"use client";

import { initialUpdatePasswordSchema } from "@/app/validation/authValidation";
import { ROUTES } from "@/constants/routes";
import authHook from "@/hooks/authHook";
import { UpdatePasswordOutgoingDTO } from "@/types/user";
import { Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const initialValues: UpdatePasswordOutgoingDTO & { confirmPassword: string } = {
  email: "",
  password: "",
  confirmPassword: "",
};

const UpdatePassword = () => {
  const { UPDATE_USER_PASSWORD } = authHook();
  const router = useRouter();

  const handleSetPassword = async (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    if (!values.email || !values.password) {
      toast.error("Fill all details.");
      return;
    }
    const data: UpdatePasswordOutgoingDTO = {
      email: values.email,
      password: values.password,
    };
   const res = await UPDATE_USER_PASSWORD(data);
   if(res?.success){ 
     toast.success("Password updated successfully")
     router.push(`${ROUTES.USER_DASHBOARD}`);
    
    };

   if(res && !res.success){
   toast.error(res?.message)
   }
    resetForm();
  };

  return (
    <div className="flex justify-center items-center h-[80%] bg-transparent sm:bg-gray-50 p-1 sm:p-4">
      <div className="w-full max-w-md bg-transparent sm:bg-white shadow-none sm:shadow-md rounded-xl p-0 sm:p-6">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSetPassword}
          validationSchema={initialUpdatePasswordSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-sm"
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* New Password */}
              <div>
                <input
                  type="password"
                  placeholder="Enter new password:Asdf@1"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-sm"
                />
                {errors.password && touched.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <input
                  type="password"
                  placeholder="Confirm password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-sm"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-first cursor-pointer hover:bg-first/80 text-white font-medium py-2 px-4 rounded-lg
                 transition-colors duration-300 disabled:opacity-60"
              >
                {isSubmitting ? "Saving..." : "Set Password"}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdatePassword;
