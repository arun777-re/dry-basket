"use client";
import React, { useCallback } from "react";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { signupAdmin } from "@/redux/slices/adminSlice";
import { RiHome8Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface registerProps {
  name: string;
  inviteCode: string;
  email: string;
  password: string;
  phone: string;
}

const initialSignUpValue: registerProps = {
  name: "",
  email: "",
  password: "",
  inviteCode: "",
  phone: "",
};
const initialSignUpSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required("Please enter a valid email"),
  phone: yup.string().required("Please enter a valid phone"),
  password: yup.string().required(),
  inviteCode: yup.string(),
});
const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const handleSignUp = useCallback(
    async (
      values: registerProps,
      { resetForm }: FormikHelpers<registerProps>
    ) => {
       dispatch(signupAdmin(values))
        .unwrap()
        .then((res) => {
          console.log('response...',res);
          if (res.success) {
            toast.success(res.message);
          }
           resetForm();
            router.push("/admin/dashboard");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    },
    [dispatch]
  );
  return (
    <Formik
      initialValues={initialSignUpValue}
      validationSchema={initialSignUpSchema}
      onSubmit={handleSignUp}
    >
      {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="relative w-[40vw] bg-white flex flex-col  z-20
        items-center justify-cente gap-5 py-10 rounded-sm shadow-xl "
        >
          <h4>Dry Basket</h4>
          <div className="relative w-full h-auto flex flex-col items-start gap-5 px-10 z-40">
            <input
              type="text"
              placeholder="name"
              name="name"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full py-3 px-2 border border-gray-600/40 rounded-sm placeholder:text-sm"
            />
            <input
              type="text"
              placeholder="InviteCode"
              name="inviteCode"
              value={values.inviteCode}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full py-3 px-2 border border-gray-600/40 rounded-sm placeholder:text-sm"
            />

            <input
              type="email"
              placeholder="Email"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full py-3 px-2 border border-gray-600/40 rounded-sm placeholder:text-sm"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full py-3 px-2 border border-gray-600/40 rounded-sm placeholder:text-sm"
            />
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              value={values.phone}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full py-3 px-2 border border-gray-600/40 rounded-sm placeholder:text-sm"
            />

            <button
              type="submit"
              className="w-full py-3 flex items-center justify-center
            rounded-lg cursor-pointer hover:bg-green-700 transition-colors duration-300 bg-green-600 text-white font-medium"
            >
              <p>SignUp</p>
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default RegisterForm;
