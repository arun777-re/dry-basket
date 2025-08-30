"use client";
import React from "react";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import Category from "../Components/Category";
import PremiumProduct from "../Components/PremiumProduct";
import Footer from "../Components/Footer";
import { usePathname } from "next/navigation";
import useSearchProductHook from "@/hooks/useSearchProductHook";

const SearchProducts: React.FC = () => {
  const path = usePathname();
  const { products } = useSearchProductHook();

  return (
    <div className="max-w-screen w-full h-auto mx-auto overflow-x-hidden">
      <Navbar />
      <Banner heading={path} />
      <Category
        success={products?.success ?? false}
        status={products?.status ?? 200}
        message={products?.message ?? ""}
        data={products?.data ?? null}
        currentPage={products?.currentPage ?? 1}
        hasNextPage={products?.hasNextPage ?? false}
        hasPrevPage={products?.hasPrevPage ?? false}
      />
      <PremiumProduct />
      <Footer />
    </div>
  );
};

export default SearchProducts;
