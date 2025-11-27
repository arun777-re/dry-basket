'use client'
import React from 'react'
import ProductCard from '../_components/card/ProductCard';
import { ProductIncomingDTO } from '@/types/product';
import DummyComponent from '../_components/DummyComponent';

type Props = {
  title: string;
  products: ProductIncomingDTO[]
}

const ProductSection: React.FC<Props> = ({ title, products }) => {
  return (
    <div className="w-full relative">
      <h4 className="text-center text-[1.4rem] md:text-2xl font-normal mb-6 text-head">{title}</h4>

      {/* Products Grid */}
      <div className="
        w-full h-auto relative 
        grid grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        gap-6">
        {products && products.length > 0 ? (
          products.slice(0, 4).map((value, key) => (
            <ProductCard
              key={key}
              productId={value._id}
              {...value}
            />
          ))
        ) : (
         <DummyComponent/>
        )}
      </div>
    </div>
  )
}

export default ProductSection
