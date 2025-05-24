'use client'

import React from 'react';
import ProductCard, { ProductCardProps } from '../_components/card/ProductCard';
import DummyComponent from '../_components/DummyComponent';

interface CategoryProps{
    data?:ProductCardProps[];
}

const Category:React.FC<CategoryProps> = ({data}) => {
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
         <DummyComponent/>
          )}
       </div>
    </section>
  )
}

export default Category