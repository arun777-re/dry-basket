"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Formik, FormikHelpers } from "formik";
import { filterSchema } from "../validation/filterProductValidation";
import useCategoryHook from "@/hooks/categoryHook";
import useSearchProductHook from "@/hooks/useSearchProductHook";
import { useFetchCategoryProducts } from "@/hooks/fetchCategoryProduct";
import Spinner from "./Spinner";
import CategoryNodeMulti from "./CategoryNode";

type Props = { page: number };

interface FilterProps {
  productName: string;
  category: string[];
  weight: string;
  price: number;
}

const initialValues: FilterProps = {
  productName: "",
  category: [],
  weight: "",
  price: 900,
};

const FilterBar: React.FC<Props> = ({ page }) => {
  const { get_all_category, category } = useCategoryHook();
  const { weights, getallproductsweight } = useSearchProductHook();
  const { fetchFilterProducts } = useFetchCategoryProducts();
  const limit = 10;

  useEffect(() => {
    Promise.allSettled([get_all_category(), getallproductsweight()]);
    fetchFilterProducts({
      page,
      limit,
      category: "",
      productName: "",
      price: initialValues.price,
      weight: undefined,
    });
  }, [get_all_category, getallproductsweight, fetchFilterProducts, page]);

  const handleOnFilterSubmit = async (
    values: FilterProps,
    { setSubmitting }: FormikHelpers<FilterProps>
  ) => {
    try {
      const categoryParam = values.category?.length
        ? values.category.join(",")
        : "";
      await fetchFilterProducts({
        page,
        limit,
        category: categoryParam,
        productName: values.productName,
        price: values.price,
        weight: values.weight || undefined,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white shadow-md rounded-lg border border-gray-200 p-4 sm:p-6 sticky top-4"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={filterSchema}
        onSubmit={handleOnFilterSubmit}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          handleBlur,
          setFieldValue,
          errors,
          isSubmitting,
          resetForm,
        }) => (
          <form className="flex flex-col gap-6 text-sm" onSubmit={handleSubmit}>
            {/* Product Name */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                name="productName"
                placeholder="Search product..."
                value={values.productName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
              />
              {errors.productName && (
                <p className="text-red-500 text-xs">{errors.productName}</p>
              )}
            </div>

            {/* Categories */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Categories</label>
              <div className="max-h-[250px] overflow-y-auto border rounded-md p-3 bg-gray-50">
                {category?.data?.length ? (
                  category.data.map((cat) => (
                    <CategoryNodeMulti
                      key={cat._id}
                      node={cat}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  ))
                ) : (
                  <p className="text-gray-500">No categories found</p>
                )}
              </div>
            </div>

            {/* Weight */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700">Weight</label>
              <select
                name="weight"
                value={values.weight}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
              >
                <option value="">Select weight</option>
                {weights?.map((item, key) => (
                  <option key={key} value={item}>
                    {item} gm
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Max Price</label>
              <input
                type="range"
                min={0}
                max={20000}
                step={100}
                value={values.price}
                onChange={(e) => setFieldValue("price", Number(e.target.value))}
                className="w-full accent-green-500"
              />
              <div className="flex justify-between text-xs text-gray-600">
                <span>₹0</span>
                <span>₹{values.price}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                className="w-full sm:w-1/2 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                onClick={() => {
                  resetForm();
                  fetchFilterProducts({
                    page,
                    limit,
                    category: "",
                    productName: "",
                    price: initialValues.price,
                    weight: undefined,
                  });
                }}
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-1/2 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
              >
                {isSubmitting ? <Spinner /> : "Search"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </motion.div>
  );
};

export default FilterBar;
