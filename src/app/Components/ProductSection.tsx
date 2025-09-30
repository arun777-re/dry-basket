'use client'
import React from 'react'
import ProductCard from '../_components/card/ProductCard';
import DummyCard from '../_components/card/DummyCard';
import { ProductIncomingDTO } from '@/types/product';

type Props = {
  title: string;
  products: ProductIncomingDTO[]
}

const ProductSection: React.FC<Props> = ({ title, products }) => {
  return (
    <div className="w-full relative">
      <h4 className="text-center text-lg md:text-xl font-semibold mb-6 text-head">{title}</h4>

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
          [...Array(4)].map((_, key) => (
            <DummyCard key={key} />
          ))
        )}
      </div>
    </div>
  )
}

export default ProductSection
