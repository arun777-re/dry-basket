"use client";
import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import Button from "../_components/Button";
import ProductCarousel from "../_components/ProductCarousel";
import { ProductIncomingDTO } from "@/types/product";
import { useFetchCategoryProducts } from "@/hooks/fetchCategoryProduct";

const BestProducts: React.FC = () => {
  const [section, setSection] = React.useState<string>("kaju");

  const { fetchCategoryProduct,products } = useFetchCategoryProducts();

  const isMounted = React.useRef<boolean>(false);
  useEffect(() => {
    isMounted.current = true;
    (async()=>{
    await fetchCategoryProduct({catname:"Kaju", sectionName:"kaju", setSection});
    
    })();
    return ()=>{
      isMounted.current = false;
    }
  }, [fetchCategoryProduct]);

  const getDriedFruits = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchCategoryProduct({catname:"Kaju", sectionName:"kaju", setSection});
  };

  const getSpicyMasala = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchCategoryProduct({catname:"Almonds", sectionName:"almonds", setSection});
  };


const productData = (products && products.data )?? [];

  return (
    <section className="w-full relative min-h-screen mx-auto">
      {/* Background Overlay */}
      <div className="absolute w-full h-full bg-white">
        {/* Background Image (enable if needed) */}
        {/* <Image
          alt="best-product-background"
          src={"/images/bp-1.jpg"}
          fill
          className="object-cover object-center"
        /> */}
      </div>

      <div className="relative w-full flex flex-col items-center justify-center 
      px-4 md:px-20 lg:px-30 py-10 sm:py-16 ">
        {/* Header */}
        <header className="w-full max-w-xl flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">Best Products</h2>
          <p className="mt-2 text-sm md:text-base text-gray-700">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>

          {/* Stars */}
          <div className="flex gap-2 items-center p-2">
            <FaStar size={16} className="text-first" />
            <FaStar size={22} className="text-body" />
            <FaStar size={16} className="text-first" />
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 py-6">
            <Button
              className={`${
                section === "kaju"
                  ? "bg-first border-first text-white drop-shadow-md drop-shadow-black/30"
                  : "bg-white border-head text-body"
              } border-2 text-sm sm:text-base px-4 sm:px-6 py-2 tracking-wide hover:bg-first hover:border-first hover:drop-shadow-xl hover:drop-shadow-black/30 transition-all duration-300 ease-in-out`}
              onClick={getDriedFruits}
            >
              Kaju
            </Button>
            <Button
              className={`${
                section === "almonds"
                  ? "bg-first border-first text-white drop-shadow-xl drop-shadow-black/30"
                  : "bg-white border-head text-body"
              } border-2 text-sm sm:text-base px-4 sm:px-6 py-2 tracking-wide hover:bg-first hover:border-first hover:drop-shadow-xl hover:drop-shadow-black/30 transition-all duration-300 ease-in-out`}
              onClick={getSpicyMasala}
            >
            Almonds
            </Button>
          </div>
        </header>

        {/* Product Section */}
        <section className="w-full relative mt-4 sm:mt-6">
          {section === "kaju" && <ProductCarousel product={productData} />}
          {section === "almonds" && <ProductCarousel product={productData} />}
        </section>
      </div>
    </section>
  );
};

export default BestProducts;
