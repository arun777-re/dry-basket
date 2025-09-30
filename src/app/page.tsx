'use client'
import React from "react";
import Banner from "./Components/Banner";
import BestProducts from "./Components/BestProducts";
import BgFixed from "./Components/BgFixed";
import Blog from "./Components/Blog";
import Footer from "./Components/Footer";
import ListingCategory from "./Components/ListingCategory";
import Navbar from "./Components/Navbar";
import PremiumProduct from "./Components/PremiumProduct";
import Process from "./Components/Process";
import authHook from "@/hooks/authHook";
import { category1, category2 } from "@/data/categoriesData";

export default function Home() {

const {getUser} = authHook();

  React.useEffect(()=>{
  getUser();
  },[getUser])
  return (
    <div className="max-w-screen min-h-screen bg-white mx-auto w-full relative h-auto overflow-x-hidden">
     <Navbar/>
     <Banner />
     <BestProducts/>
     <ListingCategory data={category1 as {category:string;image:string}[]} drxn={false} paddingBottom={true} paddingTop={true}/>
       <BgFixed image={'/images/banner-6.jpg'}
     title="Best Almonds"
     heading="Get 10% off On all Spicy & Herbs"
     subHeading="
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum quidem tenetur doloremque praesentium impedit alias eveniet aliquam quaerat corrupti possimus!
     "
     />
     <ListingCategory data={category2 as {category:string;image:string}[]} drxn={true} paddingBottom={true} paddingTop={true}/>

     <Blog/>
     <PremiumProduct/>
     <Process/>
     <Footer/>
    </div>
  );
}
