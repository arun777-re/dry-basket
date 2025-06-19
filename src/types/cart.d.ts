import { Cartitem } from "@/redux/slices/cartSlice";
import { Types } from "mongoose";

export interface CartVariant {
weight: number;
    price: number;
    discount?: number;
    discountExpiry?: Date | null;
}

export interface CartItem {
  productId: Types.ObjectId | string;
  categoryOfProduct:string;
  quantity: number;
  variant: CartVariant;
  addedAtPrice: number;
  subTotal?: number;
}

export interface CouponInfo {
  code:string;
  discountAmount: number;
  percentage: number;
}

export interface CartProps {
  items: CartItem[];
  total: number;
  coupon?: CouponInfo[];      
  finalTotal?: number;
  userId: Types.ObjectId | string;
  createdAt?: Date;           
}



export interface PopulatedCartItem extends Omit <CartItem,'productId'>{
productId:{
  images:string[],
  productName:string,
  variants:CartVariant[],
  _id:string
}
}

export interface PopulatedCart{
  _id:string;
   items:PopulatedCartItem[];
  total:number;
  coupon?:CouponInfo[];
  finalTotal?:number;
  userId?:string;
  createdAt?:Date;
}

export interface NormalizedCartItem {
  productId: string;
  productName: string;
  image: string;
  price: number;
  weight: number;
  quantity: number;

}

export interface NormalizedCart {
  _id?:string;
  items:(Cartitem | PopulatedCartItem)[];
  total:number;
  coupon?:CouponInfo[];
  finalTotal?:number;
  userId?:string;
  createdAt?:Date;
}