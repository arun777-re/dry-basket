"use client";
import React from "react";
import { FieldArray, Formik, FormikHelpers } from "formik";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import toast from "react-hot-toast";
import { updateProduct } from "@/redux/slices/productSlice";
import { VariantProps } from "@/app/Components/admin/CreateProduct";

interface ValueProps {
  isFeatured?: boolean;
  tags?: string[];
  variants?: VariantProps[];
}

const initialValues: ValueProps = {
  isFeatured: false,
  tags: [],
  variants: [
    {
      weight: 0,
      price: 0,
      stock: 0,
      discount: 0,
      discountExpiry: null,
    },
  ],
};

interface formProps {
  slug: string;
}

const UpdateProductForm: React.FC<formProps> = ({ slug }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleOnSubmit = async (
    values: ValueProps,
    { resetForm }: FormikHelpers<ValueProps>
  ) => {
    try {
     const data = {
        isFeatured:values.isFeatured,
        tags:values.tags,
        variants:values.variants
     }
      dispatch(updateProduct({ slug, data }))
        .unwrap()
        .then((res) => {
          toast.success(res.message);
          resetForm();
        })
        .catch((err) => {
          toast.error(err);
        });
    } catch (error: any) {
      toast.error(error);
    }
  };
  return (
    <div className="w-[70vw] h-[90vh] relative z-50 bg-black/90 flex items-center justify-center rounded-md shadow-xl">
      <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form
            className="w-[40%] h-[60%] p-4 relative flex flex-col gap-4 "
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2 text-white">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={values.isFeatured}
                  onChange={handleChange}
                />
                <span>Featured Product</span>
              </label>
            </div>
            <input
              type="text"
              placeholder="Comma separated tags"
              onChange={(e) =>
                setFieldValue(
                  "tags",
                  e.target.value.split(",").map((tag) => tag.trim())
                )
              }
              className="w-full p-2 border-2 border-white placeholder:text-white text-white"
            />
            <FieldArray name="variants">
              {({ push, remove }) => (
                <div className="space-y-4">
                  {values.variants?.map((variant, index) => (
                    <div key={index} className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Weight"
                        name={`variants[${index}].weight`}
                        value={variant.weight}
                        onChange={handleChange}
                        className="p-2 border-2 border-white text-white placeholder:text-white"
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        name={`variants[${index}].price`}
                        value={variant.price}
                        onChange={handleChange}
                        className="p-2 border-2 border-white text-white placeholder:text-white"
                      />
                      <input
                        type="number"
                        placeholder="Stock"
                        name={`variants[${index}].stock`}
                        value={variant.stock}
                        onChange={handleChange}
                        className="p-2 border-2 border-white placeholder:text-white text-white"
                      />
                      <input
                        type="number"
                        placeholder="Discount"
                        name={`variants[${index}].discount`}
                        value={variant.discount || ""}
                        onChange={handleChange}
                        className="p-2 border-2 border-white placeholder:text-white"
                      />
                      <input
                        type="date"
                        name={`variants[${index}].discountExpiry`}
                        value={
                          variant.discountExpiry ? variant.discountExpiry : ""
                        }
                        onChange={handleChange}
                        className="p-2 border-2 border-white placeholder:text-white text-white"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({
                        weight: 0,
                        price: 0,
                        stock: 0,
                        discount: 0,
                        discountExpiry: null,
                      })
                    }
                    className="text-blue-500 underline"
                  >
                    + Add Variant
                  </button>
                </div>
              )}
            </FieldArray>
            <Button
              type="submit"
              className="px-3 py-2 border-2 text-white border-first bg-transparent hover:bg-first transition-all duration-500 ease-in-out cursor-pointer"
            >
              Update
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateProductForm;
