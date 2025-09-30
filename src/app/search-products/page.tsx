"use client";
import React from "react";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import Category from "../Components/Category";
import PremiumProduct from "../Components/PremiumProduct";
import Footer from "../Components/Footer";
import { usePathname, useSearchParams } from "next/navigation";
import useSearchProductHook from "@/hooks/useSearchProductHook";
import Spinner from "../_components/Spinner";

const SearchProducts: React.FC = () => {
  const path = usePathname();
  const searchParams  = useSearchParams();
  const searchValue = searchParams.get('searchValue') || '';
  
  const {loading } = useSearchProductHook();
  if(loading){
    return <Spinner/>
  }
  return (
    <div className="max-w-screen w-full h-auto mx-auto overflow-x-hidden">
      <Navbar />
      <Banner heading={path.startsWith("/") ? path.slice(1) : path} />
      <Category
        searchValue={searchValue}
      />
      <PremiumProduct />
      <Footer />
    </div>
  );
};

export default SearchProducts;
