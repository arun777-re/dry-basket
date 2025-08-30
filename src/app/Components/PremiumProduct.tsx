import React from "react";
import { FaStar } from "react-icons/fa";
import PremiumCard from "../_components/card/PremiumCard";
import { premiumProductData } from "@/data/premiumProduct";

const PremiumProduct = () => {

  return (
    <section className="max-w-screen w-full h-auto bg-gray-100">
      <div className="relative w-full px-30 flex flex-col items-center justify-center gap-10 py-20">
        <header className="relative max-w-lg w-full flex flex-col items-center justify-center ">
          <h2>Premium Quality Products</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.dkjld
            jhsjkls were.
          </p>
          <div className="flex gap-2 items-center p-2">
            <FaStar size={18} className="text-first " />
            <FaStar size={25} className="text-body" />
            <FaStar size={18} className="text-first " />
          </div>
        </header>

        <section className="w-full relative flex items-center justify-center gap-8">
          {premiumProductData &&
            premiumProductData.length > 0 &&
            premiumProductData.map((item, index) => {
              return <PremiumCard key={index} {...item} />;
            })}
        </section>
      </div>
    </section>
  );
};

export default PremiumProduct;
