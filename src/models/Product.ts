import { ProductDocument } from "@/types/product";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema<ProductDocument>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    productName: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "dates",
        "nuts",
        "seeds",
        "berries",
        "dry fruits",
        "dried fruits",
        "exotic nuts",
        "flavored nuts",
        "super foods",
        "millets",
        "oil & ghee",
        "unit of ayurveda",
        "series of wellness",
        "drinks",
        "candies & chocolate",
        "honey",
        "organic spices",
        "teas",
        "muesli & energy bars",
        "murabbe",
        "handicraft items",
        "shawl & stoles",
        "gift hampers",
        "dev bhumi speciality",
      ],
    },
    status: {
      type: String,
      default: "available",
      enum: ["available", "unavailable"],
    },
    description: { type: String, required: true, minlength: 50 },
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
      },
    ],
    variants: [
      {
        weight: { type: Number, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
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
  mongoose.models.Product || mongoose.model<ProductDocument,mongoose.Model<ProductDocument>>("Product", productSchema);

export default Product;
