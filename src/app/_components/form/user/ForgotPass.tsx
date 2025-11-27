"use client";

import { forgotPass } from "@/redux/slices/userSlice";
import { AppDispatch } from "@/redux/store/store";
import { Formik, FormikHelpers } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import * as yup from "yup";

interface ForgotProps {
  email: string;
  password: string;
  confirmPass: string;
}

const initialLoginValue: ForgotProps = {
  email: "",
  password: "",
  confirmPass: "",
};

const initialLoginSchema = yup.object().shape({
  email: yup.string().email("Enter valid email type").required(),
  password: yup
    .string().required(),
  confirmPass: yup.string().oneOf([yup.ref("password"), ""], "Passwors must match")
    .required(),
});

interface ValueProps {
  setPass: (value: boolean) => void;
}
const ForgotPass: React.FC<ValueProps> = ({ setPass }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleForgotPass = async (
    values: ForgotProps,
    { resetForm }: FormikHelpers<ForgotProps>
  ) => {
    if (values) {
      const payload = {
        email: values.email,
      };
      dispatch(forgotPass(values.email))
        .unwrap()
        .then((res) => {
          toast.success(res?.message);
          resetForm();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  return (
    <div className="w-full h-auto py-10 z-1000">
      <Formik
        initialValues={initialLoginValue}
        validationSchema={initialLoginSchema}
        onSubmit={handleForgotPass}
      >
        {({
          values,
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
        }) => (
          <form
            onSubmit={handleSubmit}
            method="POST"
            className="relative w-full flex flex-col px-4 z-20 
        items-center justify-center gap-5  "
          >
            <div className="relative w-full h-auto flex flex-col items-start gap-5 md:px-10 z-40">
              <input
                type="email"
                placeholder="Email:name@gmail.com"
                name="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                className="w-full py-3 px-6 focus:border-head border-1 border-transparent bg-white rounded-full placeholder:text-sm"
              />
              {touched.email && errors.email && (
                <div className="text-red-500 text-sm">{errors.email}</div>
              )}
              <input
                type="password"
                placeholder="Password:Asdf@145"
                name="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                className="w-full py-3 px-6 focus:border-head border-1 border-transparent bg-white rounded-full placeholder:text-sm"
              />
              {touched.password && errors.password && (
                <div className="text-red-500 text-sm">{errors.password}</div>
              )}
              <input
                type="password"
                placeholder="Confirm Password:Asdf@145"
                name="confirmPass"
                value={values.confirmPass}
                onBlur={handleBlur}
                onChange={handleChange}
                className="w-full py-3 px-6 focus:border-head border-1 border-transparent bg-white rounded-full placeholder:text-sm"
              />
              {touched.confirmPass && errors.confirmPass && (
                <div className="text-red-500 text-sm">{errors.confirmPass}</div>
              )}

              <button
                type="submit"
                className="px-6 py-2 flex items-center justify-center bg-transparent border-2 border-head
             rounded-full cursor-pointer hover:bg-first
             hover:border-first transition-all duration-500 ease-in-out font-medium text-white"
              >
                Update Password
              </button>
            </div>
          </form>
        )}
      </Formik>
      <MdCancel
        onClick={() => setPass(false)}
        size={30}
        className="absolute top-0 right-0  bg-white cursor-pointer"
      />
    </div>
  );
};

export default ForgotPass;
