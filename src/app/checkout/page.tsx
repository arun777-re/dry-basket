"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LuShoppingBag } from "react-icons/lu";
import CheckOutForm from "../_components/form/CheckOutForm";



// debounce hook

const CheckOutPage = () => {
    const router = useRouter();
  

  return (
    <div className="max-w-screen w-full relative min-h-screen h-auto mx-auto bg-black/80">
      <header className="w-full h-20 px-40 flex items-center justify-between ">
        <h4 className="text-white text-2xl font-bold">DryBasket</h4>
        <LuShoppingBag
          size={24}
          className="text-blue-700 cursor-pointer"
          onClick={() => router.push("/cart")}
        />
      </header>
   <CheckOutForm/>
    </div>
  );
};

export default CheckOutPage;
