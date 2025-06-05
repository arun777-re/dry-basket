"use client";
import React from "react";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { RiHome8Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { loginUser } from "@/redux/slices/userSlice";
import toast from "react-hot-toast";
import { ErrorProps } from "@/redux/slices/adminSlice";
import Image from "next/image";
import Button from "@/app/_components/Button";
import ForgotPass from "./ForgotPass";

interface loginProps {
  email: string;
  password: string;
}

const initialLoginValue: loginProps = {
  email: "",
  password: "",
};

const initialLoginSchema = yup.object().shape({
  email: yup.string().email("Enter valid email type").required(),
  password: yup.string().required(),
});

const LoginForm = () => {
  // state to open forgot password
const [pass,setPass] = React.useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogin = async (
    values: loginProps,
    { resetForm }: FormikHelpers<loginProps>
  ) => {
    try {
      // API call to login user
      await dispatch(loginUser(values))
        .unwrap()
        .then((res) => {
          toast.success("Login Successfull");
          router.push("/");
        })
        .catch((err: ErrorProps) => {
          const message = err?.message || "Login Failed";
          toast.error(message);
          router.push("/user/auth-login");
        });
      resetForm();
    } catch (error) {
      console.error("login failed. Please check your credentials.");
      throw new Error("login failed. Please check your credentials.");
    }
  };
  return (
    <div className="max-w-[100vw] w-full relative bg-gray-100 shadow-2xl py-10 z-10">
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
          <form
            onSubmit={handleSubmit}
            method="POST"
            className="relative w-full flex flex-col px-4 z-20 
        items-center justify-center gap-5  "
          >
            <div className="relative w-full h-auto flex flex-col items-start gap-5 md:px-10 ">
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

              <button
                type="submit"
                className="px-6 py-2 flex items-center justify-center bg-transparent border-2 border-head
             rounded-full cursor-pointer hover:bg-first
             hover:border-first transition-all duration-500 ease-in-out font-medium"
              >
                Login
              </button>
            </div>
          </form>
        )}
      </Formik>
      <Button type='button' onClick={()=>setPass(true)

      } className="font-medium underline hover:text-first transition-all duration-500 ease-in-out">Forgot Password ?</Button>
    {
pass === true && ( <div className="absolute w-full h-full top-0 left-0 bg-black/60 z-50">
          <ForgotPass setPass={setPass}/>
    </div>)
    }
   
    </div>
  );
};

export default LoginForm;
