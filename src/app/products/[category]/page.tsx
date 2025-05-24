'use client'
import Banner from '@/app/Components/Banner'
import Category from '@/app/Components/Category';
import Footer from '@/app/Components/Footer';
import Navbar from '@/app/Components/Navbar'
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { products } from '@/app/Components/BestProducts';
import PremiumProduct from '@/app/Components/PremiumProduct';

const ProductByCategory = () => {

    const router = usePathname();
    const path = router as string;

    // here we get all items using api related to a category
    // useEffect(()=>{},[])

  return (
    <div className='max-w-screen w-full h-auto mx-auto overflow-x-hidden'>
        <Navbar/>
        <Banner heading={path}/>
         <Category data={products}/>
         <PremiumProduct/>
        <Footer/>
    </div>
  )
}

export default ProductByCategory