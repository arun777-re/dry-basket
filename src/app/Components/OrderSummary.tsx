"use client";

import { RootState } from "@/redux/store/store";
import {
  CartIncomingDTO,
  CartItemOutgoingDTO,
  PopulatedCartItemDTO,
} from "@/types/cart";
import { useSelector } from "react-redux";
import CheckOutProduct from "../_components/card/CheckOutProduct";
import { selectCartTotal } from "@/redux/slices/cartSlice";
import React from "react";
import orderHook from "@/hooks/orderHook";
import ApplyCoupon from "../_components/form/ApplyCoupon";

type OrderSummaryProps = {
  pincode:string;
}


const OrderSummary:React.FC<OrderSummaryProps> = ({pincode}) => {
  const shippingRate = useSelector(
    (state: RootState) => state.shipping.shippingCharges
  );

  const userCart: CartIncomingDTO | null= useSelector(
    (state: RootState) => state.usercart.cart.data
  );
  const total = useSelector(selectCartTotal);
  return (
    <div className="relative w-full lg:w-1/2  lg:min-h-screen h-auto bg-white p-5 flex flex-col items-start">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="relative flex flex-col gap-4 w-full mb-4">
        {userCart &&  Array.isArray(userCart?.items) && userCart.items.length > 0 && userCart?.items.map((item: PopulatedCartItemDTO, index) => {
          return (
            <CheckOutProduct
              key={index}
              imageSrc={item.productId.images?.[0]}
              productName={item.productId.productName}
              priceAfterDiscount={item.variant.priceAfterDiscount}
              quantity={item.quantity}
              weight={item.variant.weight}
            />
          );
        })}
      </div>

      <p className="text-sm  mb-2">
        <strong>Cart Amount:</strong> ₹{userCart?.finalTotal || total}
      </p>
      <p className="text-sm  mb-2">
        <strong>Items:</strong> {userCart?.items?.length || 0}
      </p>
      <div className="">
      <ApplyCoupon cartItems={userCart !== null && true}/>
      </div>
      {pincode.length === 6  ? (
        <p className="mt-2">
          <strong>Shipping Charges:</strong> ₹{shippingRate}
        </p>
      ) : (
        <p className="text-sm animate-caret-blink mt-2">Enter Shipping Details to view shipping charges</p>
      )}
      {shippingRate !== 0 && <b className={`${shippingRate ? 'flex' : 'hidden'} text-base mt-2`}>
        Total Amount:₹{shippingRate + userCart?.finalTotal!}
        </b>}
    </div>
  );
};

export default OrderSummary;
