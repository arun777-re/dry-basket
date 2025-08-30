'use client'
import Banner from '@/app/Components/Banner'
import Category from '@/app/Components/Category';
import Footer from '@/app/Components/Footer';
import Navbar from '@/app/Components/Navbar'
import { useParams, usePathname } from 'next/navigation';
import React from 'react';
import products  from '@/app/Components/BestProducts';
import PremiumProduct from '@/app/Components/PremiumProduct';
import { ProductIncomingDTO } from '@/types/product';
import { useFetchCategoryProducts } from '@/hooks/fetchCategoryProduct';

const ProductByCategory = () => {
  // state to hold products data instantly when api fetches 
    const [products,setProducts] = React.useState<ProductIncomingDTO[]>([]);
    const router = usePathname();
    const path = router as string;
    const {category} = useParams();

    const {fetchAllProductsAssociatedWithCategory} = useFetchCategoryProducts();

    React.useEffect(()=>{
      fetchAllProductsAssociatedWithCategory({catname:category as string,setProducts:setProducts,page:1,limit:10});

    },[])

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