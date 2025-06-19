import { OrderSchema } from "@/types/order";
import mongoose, { Types } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    cart: {
      type: Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    shippingDetails: {
      country: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      appartment: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pinCode: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

orderSchema.index({ userId: 1, status: 1 });

const Order =
  mongoose.models.Order || mongoose.model<OrderSchema>("Order", orderSchema);

export default Order;
