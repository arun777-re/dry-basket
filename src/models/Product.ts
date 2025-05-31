import { ProductDocument } from "@/types/product";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema<ProductDocument>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    productName: {
      type: String,
      required: [true, "Please Enter Product Name"],
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please Add a Product  Category"],
    },
    status: {
      type: String,
      default: "available",
      enum: ["available", "unavailable"],
    },
    description: {
      type: String,
      required: true,
      minlength: [50, "Description must be 50 characters"],
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    review: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
        required: false,
      },
    ],
    variants: [
      {
        weight: { type: Number, required: true },
        price: {
          type: Number,
          required: [true, "Please enter Price of Product"],
          max: [99999999, "Price cannot be exceeds 8 digits"],
        },
        stock: {
          type: Number,
          required: [true, "Please enter Stock of Product"],
          default: 1,
          max: [99999, "Stock cannot exceeds 5 characters"],
        },
        discount: { type: Number, default: 0 },
        discountExpiry: {
          type: Date,
          default: null,
        },
      },
    ],
    offer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer",
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product ||
  mongoose.model<ProductDocument, mongoose.Model<ProductDocument>>(
    "Product",
    productSchema
  );

export default Product;
