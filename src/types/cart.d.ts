import { Types } from "mongoose";

export interface CartItem {
  productId: Types.ObjectId;
  quantity: number;
  variant: {
    weight: number;
    price: number;
    discount?: number;
    discountExpiry?: Date | null;
  };
  addedAtPrice: number;
  subTotal: number;
}

export interface CouponInfo {
  code?: string;
  discountAmount?: number;
  percentage?: number;
}

export interface CartProps {
  items: CartItem[];
  total: number;
  coupon?: CouponInfo;      
  finalTotal: number;
  userId: Types.ObjectId | string;
  createdAt?: Date;           
}
