"use client";
import React from "react";
import { Formik ,FormikHelpers} from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { OfferFormValues } from "@/types/offer";
import { createOffer } from "@/redux/slices/offerSlice";
import toast from "react-hot-toast";

const initialValues: OfferFormValues = {
  code: "",
  description: "",
  discountType: "percentage",
  value: 0,
  minOrderAmount: 0,
  appliesToCategories: "",
  expiresAt: "",
  usageLimit: 0,
};

const validationSchema = Yup.object().shape({
  code: Yup.string().min(6,'Must be 6 characters').max(12,'Length is 6-12 characters').required("Required"),
  description: Yup.string().min(10, "Too short").required("Required"),
  discountType: Yup.string().required("Required"),
  value: Yup.number().required("Required"),
  minOrderAmount: Yup.number().notRequired(),
  appliesToCategories: Yup.string().notRequired(),
  expiresAt: Yup.date()
    .typeError("Enter a valid date")
    .required("Enter a Valid expiry date"),
  usageLimit: Yup.number().notRequired(),
});

const CreateOffer = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleOnSubmit = async (values: OfferFormValues,{resetForm}:FormikHelpers<OfferFormValues>) => {
    const payload = {
      ...values,
      appliesToCategories: values.appliesToCategories
        ?.split(",")
        .map((cat) => cat.trim())
        .filter(Boolean),
      expiresAt: values.expiresAt ? new Date(values.expiresAt) : null,
    };

     await dispatch(createOffer(values))
      .unwrap()
      .then((res) => {
          toast.success(res?.message);
          resetForm();
        
      })
      .catch((err) => {
        toast.error(err?.message);
      });
      
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create Offer</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="code"
              placeholder="Code:ASDF12"
              value={values.code}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border"
            />
            {touched.code && errors.code && (
              <p className="text-red-500">{errors.code}</p>
            )}
            <input
              type="text"
              name="description"
              placeholder="Offer Description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border"
            />
            {touched.description && errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
            <select
              name="discountType"
              value={values.discountType}
              onChange={handleChange}
              className="w-full p-2 border"
            >
              <option value="percentage">Percentage</option>
              <option value="flat">Flat</option>
            </select>

            <input
              type="number"
              name="value"
              placeholder="Enter Value of Discount "
              value={values.value}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border"
            />
            {touched.value && errors.value && (
              <p className="text-red-500">{errors.value}</p>
            )}
            <input
              type="number"
              name="minOrderAmount"
              placeholder="Minimum Order Amount offer applies to"
              value={values.minOrderAmount}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border"
            />
            {touched.minOrderAmount && errors.minOrderAmount && (
              <p className="text-red-500">{errors.minOrderAmount}</p>
            )}

            <input
              type="text"
              name="appliesToCategories"
              placeholder="Add comma-separated category to which offer applied"
              value={values.appliesToCategories}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border"
            />
            {touched.appliesToCategories && errors.appliesToCategories && (
              <p className="text-red-500">{errors.appliesToCategories}</p>
            )}
            <input
              type="datetime-local"
              name="expiresAt"
              placeholder="Date at which offer expires"
              value={values.expiresAt}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border"
            />
            {touched.expiresAt && errors.expiresAt && (
              <p className="text-red-500">{errors.expiresAt}</p>
            )}
            <input
              type="number"
              name="usageLimit"
              placeholder="Enter limit of Offer to be used"
              value={values.usageLimit}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border"
            />
            {touched.usageLimit && errors.usageLimit && (
              <p className="text-red-500">{errors.usageLimit}</p>
            )}
            <button
              type="submit"
              className="w-full p-3 bg-black text-white rounded"
            >
              Create Offer
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CreateOffer;
