"use client";
import React from "react";
import { Formik, FieldArray, FormikHelpers } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { handleImageUpload } from "@/lib/middleware/cloudinary";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { createProduct } from "@/redux/slices/productSlice";
import toast from "react-hot-toast";

interface VariantProps {
  weight: number;
  price: number;
  stock: number;
  discount?: number;
  discountExpiry?: string | null;
}

interface ProductType {
  productName: string;
  category: string;
  description: string;
  images: File[];
  isFeatured: boolean;
  tags: string[];
  variants: VariantProps[];
  status: string;
}

const initialValues: ProductType = {
  productName: "",
  category: "",
  description: "This is a default description that satisfies the validation.",
  images: [],
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
  status: "available",
};

const validationSchema = Yup.object().shape({
  productName: Yup.string().required("Required"),
  description: Yup.string().min(20, "Too short").required("Required"),
  category: Yup.string().required("Required"),
  status: Yup.string().required("Required"),
  variants: Yup.array().of(
    Yup.object().shape({
      weight: Yup.number().required("Required"),
      price: Yup.number().required("Required"),
      stock: Yup.number().required("Required"),
      discount: Yup.number().nullable(),
      discountExpiry: Yup.string().nullable(),
    })
  ),
});

const ProductForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleOnSubmit = async (values: ProductType,{resetForm}:FormikHelpers<ProductType>) => {
    const formData = new FormData();
    formData.append("productName", values.productName);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("status", values.status);
    formData.append("isFeatured", String(values.isFeatured));
    formData.append("tags", JSON.stringify(values.tags));
    formData.append("variants", JSON.stringify(values.variants));

    try {
      // save images to cloudinary in parallel before sending request to backend
      const imageUrls = await Promise.all(
        values.images.map((file) => handleImageUpload(file).then((res) => res))
      );
      formData.append("images", JSON.stringify(imageUrls));
     dispatch(createProduct(formData)).unwrap().then((res)=>{
      toast.success(res.message);
resetForm();
     }).catch((err)=>{
      toast.error(err.message)
     })
    } catch (err) {
      console.error("❌ Submission failed:", err);
      alert("Failed to submit product");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create Product</h2>
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
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              value={values.productName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border"
            />
            {touched.productName && errors.productName && (
              <p className="text-red-500">{errors.productName}</p>
            )}

            <textarea
              name="description"
              placeholder="Description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border"
            />
            {touched.description && errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={values.category}
              onChange={handleChange}
              className="w-full p-2 border"
            />
            {touched.category && errors.category && (
              <p className="text-red-500">{errors.category}</p>
            )}

            <select
              name="status"
              value={values.status}
              onChange={handleChange}
              className="w-full p-2 border"
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isFeatured"
                checked={values.isFeatured}
                onChange={handleChange}
              />
              <span>Featured Product</span>
            </label>

            <input
              type="text"
              placeholder="Comma separated tags"
              onChange={(e) =>
                setFieldValue(
                  "tags",
                  e.target.value.split(",").map((tag) => tag.trim())
                )
              }
              className="w-full p-2 border"
            />

            <Dropzone
              onDrop={(acceptedFiles) =>
                setFieldValue("images", [...values.images, ...acceptedFiles])
              }
            >
              {({ getRootProps, getInputProps }) => (
                <section className="border p-4">
                  <div {...getRootProps()} className="cursor-pointer">
                    <input {...getInputProps()} />
                    {values.images.length > 0 ? (
                      <p>{values.images.map((f) => f.name).join(", ")}</p>
                    ) : (
                      <p>Drag & drop files here, or click to upload</p>
                    )}
                  </div>
                </section>
              )}
            </Dropzone>

            <FieldArray name="variants">
              {({ push, remove }) => (
                <div className="space-y-4">
                  {values.variants.map((variant, index) => (
                    <div key={index} className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Weight"
                        name={`variants[${index}].weight`}
                        value={variant.weight}
                        onChange={handleChange}
                        className="p-2 border"
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        name={`variants[${index}].price`}
                        value={variant.price}
                        onChange={handleChange}
                        className="p-2 border"
                      />
                      <input
                        type="number"
                        placeholder="Stock"
                        name={`variants[${index}].stock`}
                        value={variant.stock}
                        onChange={handleChange}
                        className="p-2 border"
                      />
                      <input
                        type="number"
                        placeholder="Discount"
                        name={`variants[${index}].discount`}
                        value={variant.discount || ""}
                        onChange={handleChange}
                        className="p-2 border"
                      />
                      <input
                        type="date"
                        name={`variants[${index}].discountExpiry`}
                        value={
                          variant.discountExpiry ? variant.discountExpiry : ""
                        }
                        onChange={handleChange}
                        className="p-2 border"
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

            <button
              type="submit"
              className="w-full p-3 bg-black text-white rounded"
            >
              Create Product
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ProductForm;
