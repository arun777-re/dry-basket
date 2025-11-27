"use client";
import React, { useEffect } from "react";
import Button from "../_components/Button";
import ProductCarousel from "../_components/ProductCarousel";
import { useFetchCategoryProducts } from "@/hooks/fetchCategoryProduct";

const BestProducts: React.FC = () => {
  const [section, setSection] = React.useState<string>("kaju");

  const { fetchCategoryProduct, products } = useFetchCategoryProducts();

  const isMounted = React.useRef<boolean>(false);

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    (async () => {
      await fetchCategoryProduct({
        catname: "Kaju",
        sectionName: "kaju",
        setSection,
      });
    })();

    return () => {
      isMounted.current = false;
    };
  }, [fetchCategoryProduct]);

  const getDriedFruits = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchCategoryProduct({
      catname: "Kaju",
      sectionName: "kaju",
      setSection,
    });
  };

  const getSpicyMasala = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchCategoryProduct({
      catname: "Almonds",
      sectionName: "almonds",
      setSection,
    });
  };

  const productData = (products && products.data) ?? [];
  console.log("Best Products Data:", productData);

  return (
    <section className="w-full relative min-h-screen h-auto mx-auto overflow-hidden bg-body/5">
      <div className="relative w-full flex flex-col items-center justify-center 
      px-4  py-10 sm:py-16">

        {/* Header */}
        <header className="w-full max-w-xl flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-head">
            Best Products
          </h2>

          <p className="mt-2 text-sm md:text-base tracking-wide">
           Best products from dry basket choose for you.
          </p>
          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 py-6">

            {/* Kaju */}
            <Button
              className={`${
                section === "kaju"
                  ? "bg-first border-first text-white shadow-md shadow-body/30"
                  : "bg-body border-head text-head"
              } border-2 text-sm sm:text-base px-4 sm:px-6 py-2 tracking-wide 
              hover:bg-head hover:border-head hover:text-body transition-all duration-300`}
              onClick={getDriedFruits}
            >
              Kaju
            </Button>

            {/* Almonds */}
            <Button
              className={`${
                section === "almonds"
                  ? "bg-first border-first text-white shadow-md shadow-body/30"
                  : "bg-body border-head text-head"
              } border-2 text-sm sm:text-base px-4 sm:px-6 py-2 tracking-wide 
              hover:bg-head hover:border-head hover:text-body transition-all duration-300`}
              onClick={getSpicyMasala}
            >
              Almonds
            </Button>

          </div>
        </header>

        {/* Product Section */}
        <div className="w-full relative mt-4 sm:mt-6 h-[70%]">
          {section === "kaju" && <ProductCarousel product={productData} />}
          {section === "almonds" && <ProductCarousel product={productData} />}
        </div>

      </div>
    </section>
  );
};

export default BestProducts;
