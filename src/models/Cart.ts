import { CartProps } from "@/types/cart";
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema<CartProps>(
  {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        categoryOfProduct: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 0,
        },
        variant: {
          weight: { type: Number, required: true },
          price: { type: Number, required: true },
          discount: { type: Number, required: false },
          discountExpiry: { type: Date, default: null },
        },
        addedAtPrice: {
          type: Number,
          required: true,
        },
        subtotal: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    coupon: [
      {
        code: { type: String, default: null },
        discountAmount: { type: Number, default: 0 },
        percentage: { type: Number, default: 0 },
      },
    ],
    finalTotal: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

cartSchema.pre("save", function (next) {
  const cart = this as unknown as CartProps;
  // calculate subtotal for each item
  cart.items = cart.items.map((item: any) => {
    let priceAfterDiscount = item.variant.price;
    if(item.variant.discountExpiry && (new Date(item.variant.discountExpiry).getTime() > Date.now())){
    const discountRate = item.variant.discount / 100;
     priceAfterDiscount = item.variant.price * (1 - discountRate);
    }
    item.subtotal = priceAfterDiscount * item.quantity;

    return item;

  });

  // cart total = sum of all subtotals
  cart.total = cart.items.reduce((acc: number, item: any) => {
    return acc + item.subtotal;
  }, 0);

  let finalTotal = cart.total;

  cart.finalTotal = Math.max(finalTotal, 0);
  next();
});

const Cart =
  mongoose.models.Cart || mongoose.model<CartProps>("Cart", cartSchema);
export default Cart;
