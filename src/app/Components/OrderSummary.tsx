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

type OrderSummaryProps = {
  pincode:string;
}


const OrderSummary:React.FC<OrderSummaryProps> = ({pincode}) => {
  const shippingRate = useSelector(
    (state: RootState) => state.shipping.shippingCharges
  );

  const userCart: CartIncomingDTO = useSelector(
    (state: RootState) => state.usercart.cart.data
  );
  const total = useSelector(selectCartTotal);
  return (
    <div className="relative w-1/2 min-h-screen bg-white p-5 flex flex-col items-start">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="relative flex flex-col gap-4 w-full mb-4">
        {userCart.items.map((item: PopulatedCartItemDTO, index) => {
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

      <p className="text-sm  mb-3">
        <strong>Total Amount:</strong> ₹{userCart.finalTotal || total}
      </p>
      <p className="text-sm  mb-3">
        <strong>Items:</strong> {userCart.items?.length || 0}
      </p>
      {pincode.length === 6  ? (
        <p>
          <strong>Shipping Charges:</strong> ₹{shippingRate}
        </p>
      ) : (
        <p className="text-sm animate-caret-blink">Enter Shipping Details to view shipping charges</p>
      )}
    </div>
  );
};

export default OrderSummary;
