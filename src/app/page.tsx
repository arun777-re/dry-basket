'use client'
import React from "react";
import Banner from "./Components/Banner";
import BestProducts from "./Components/BestProducts";
import Blog from "./Components/Blog";
import Footer from "./Components/Footer";
import ListingCategory from "./Components/ListingCategory";
import Navbar from "./Components/Navbar";
import PremiumProduct from "./Components/PremiumProduct";
import Process from "./Components/Process";
import authHook from "@/hooks/authHook";
import { category1, category2 } from "@/data/categoriesData";
import Head from "next/head";

export default function Home() {

const {getUser} = authHook();

const isMounted = React.useRef<boolean>(false)

  React.useEffect(()=>{
    if(isMounted.current) return;
    isMounted.current = true;
  getUser();
  return ()=>{
    isMounted.current = false;
  }
  },[getUser])
  return (
   <>
      <Head>
        <title>Buy Best Almonds Online | Spices & Herbs Discounts</title>
        <meta
          name="description"
          content="Shop the best almonds, spices & herbs online. Get 10% off on premium quality products delivered fast to your doorstep."
        />
        <meta name="keywords" content="almonds, spices, herbs, online shopping, premium nuts, discounts" />
        <link rel="canonical" href="https://yourwebsite.com/" />
        {/* Open Graph / Social Media */}
        <meta property="og:title" content="Buy Best Almonds Online | Spices & Herbs" />
        <meta property="og:description" content="Shop premium almonds, spices & herbs with 10% discount." />
        <meta property="og:url" content="https://yourwebsite.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://yourwebsite.com/images/banner-6.jpg" />
      </Head>
      <div className="max-w-screen min-h-screen bg-white mx-auto w-full relative h-auto overflow-x-hidden">
        <Navbar />
        <Banner />
        <BestProducts />
        <ListingCategory
          data={category1 as { category: string; image: string }[]}
          drxn={false}
          paddingBottom={true}
          paddingTop={true}
        />
      
        <ListingCategory
          data={category2 as { category: string; image: string }[]}
          drxn={true}
          paddingBottom={true}
          paddingTop={true}
        />
        <Blog />
        <PremiumProduct />
        <Process />
        <Footer />
      </div>
    </>
  );
}
