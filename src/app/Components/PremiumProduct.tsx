'use client';
import React from "react";
import { FaStar } from "react-icons/fa";
import PremiumCard from "../_components/card/PremiumCard";
import { premiumProductData } from "@/data/premiumProduct";

const PremiumProduct = () => {
  return (
    <section className="max-w-screen w-full h-auto bg-[#1f6f6f10]">
      <div className="relative w-full px-4 md:px-20 lg:px-30 flex flex-col items-center justify-center gap-10
       py-10 sm:py-16 md:py-16">

        <header className="relative max-w-lg w-full flex flex-col items-center justify-center text-center px-2">
          <h2 className="text-2xl md:text-3xl font-semibold text-head">
            Premium Quality Products
          </h2>

          <p className="text-sm md:text-base mt-2 ">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
        </header>

        {/* grid */}
        <section
          className="
            w-full relative 
            grid gap-6 
            grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
            place-items-center
          "
        >
          {premiumProductData?.map((item, index) => (
            <PremiumCard key={index} {...item} />
          ))}
        </section>
      </div>
    </section>
  );
};

export default PremiumProduct;
