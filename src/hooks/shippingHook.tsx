"use client";

import { createOrderAndAssignOrderForShipment, getShippingCharges } from "@/redux/slices/shippingSlice";
import { AppDispatch } from "@/redux/store/store";
import React from "react";
import { useDispatch } from "react-redux";

const shippingHook = () => {
  const dispatch = useDispatch<AppDispatch>();

//   debounce hook
 function useDebounceHook<T>(value:T,delay:number){
     const [debounced,setDebounced] = React.useState(value);

     React.useEffect(()=>{
        const handler = setTimeout(()=>setDebounced(value),delay);

        return ()=>{
            clearTimeout(handler)
        }
     },[value,delay]);

     return debounced;
 }

  const SHIPPING_RATE_CALCULATOR = async ({
    weight,
    pincode,
  }: {
    weight: string;
    pincode: string;
  }) => {
    try {
   await dispatch(getShippingCharges({weight:parseFloat(weight),
    pincode:parseFloat(pincode)
   }))
    } catch (error) {
      console.error("Error fetching shipping charges:", error);
    }
  };

     const useCreateOrderForShipment = React.useCallback(async (orderId:string) => {
       await dispatch(createOrderAndAssignOrderForShipment(orderId))
         .unwrap()
         .then((res) => {
         });
     }, [createOrderAndAssignOrderForShipment, dispatch]);

  return {SHIPPING_RATE_CALCULATOR,useDebounceHook,useCreateOrderForShipment};
};
export default shippingHook;
