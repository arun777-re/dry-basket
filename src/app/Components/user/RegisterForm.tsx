"use client";
import React, { useCallback } from "react";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useRouter } from "next/navigation";
import { createUser } from "@/redux/slices/userSlice";
import toast from "react-hot-toast";
import { mergeCart } from "@/redux/slices/cartSlice";
import { CartItem } from "@/types/cart";

interface registerProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

const initialSignUpValue: registerProps = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
};
const initialSignUpSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required("Please enter a valid email"),
  phone: yup.string().required("Please enter a valid phone"),
  password: yup.string().required(),
});
const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [valid, setValid] = React.useState<boolean>(false);

  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

  const cartitems = JSON.parse(localStorage.getItem("guestCart") ?? "[]");
  const payload = cartitems.map((item: any) => ({
    productId: item?.productId,
    categoryOfProduct:item?.categoryOfProduct,
    quantity: item?.quantity,
    variant: item?.variant,
    addedAtPrice: item?.addedAtPrice,
  }));
  // get guestcart
  React.useEffect(() => {
    setCartItems(payload);
  }, []);

  const router = useRouter();

  const handleSignUp = useCallback(
    async (
      values: registerProps,
      { resetForm }: FormikHelpers<registerProps>
    ) => {
      try {
        await dispatch(createUser(values)).unwrap();
        toast.success("SignUp completed");
        setValid(true);
        router.push("/cart");
        resetForm();
      } catch (error: any) {
        toast.error(error.message);
        router.push("/user/auth-login");
      }
    },
    [dispatch]
  );

  React.useEffect(() => {
    dispatch(mergeCart({items:cartItems})).unwrap();
  }, [valid,dispatch]);
  return (
    <div className="w-full relative bg-gray-100 shadow-2xl py-10">
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
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                value={values.phone}
                onBlur={handleBlur}
                onChange={handleChange}
                className="w-full py-3 px-6 focus:outline-head outline-1 border-transparent bg-white rounded-full placeholder:text-sm"
              />
              {touched.phone && errors.phone && (
                <div className="text-red-500 text-sm">{errors.phone}</div>
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
