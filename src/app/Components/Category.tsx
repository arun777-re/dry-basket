'use client'

import React from 'react';
import ProductCard from '../_components/card/ProductCard';
import DummyComponent from '../_components/DummyComponent';
import { ProductIncomingDTO } from '@/types/product';
import { PaginatedProductResponse } from '@/types/response';


const Category:React.FC<PaginatedProductResponse<ProductIncomingDTO>> = ({data,
  currentPage,hasNextPage,hasPrevPage,success}) => {
  return (
    <section className='max-w-screen w-full h-auto mx-auto relative'>
       <div className="w-full h-auto relative px-30 py-20 flex items-center justify-between flex-wrap gap-8">
          
          {data && Array.isArray(data) && data.length > 0 ? data?.map((item,index)=>{
            return (
                <div key={index} className="w-1/4 relative ">
                <ProductCard  {...item}/>
                </div>
            )
          }) : (
            <>
            <h1>No Products to Show</h1>
         <DummyComponent/>
            </>
          )}
       </div>
    </section>
  )
}

export default Category