'use client'
import React from 'react'
import ProductCard from '../_components/card/ProductCard';
import DummyCard from '../_components/card/DummyCard';
import { ProductIncomingDTO } from '@/types/product';

type Props = {
    title:string;
    products:ProductIncomingDTO[]
}

const ProductSection:React.FC<Props> = ({title,products}) => {
  return (
  <div className="w-full relative">
              <h4 className="text-center mb-4">{title}</h4>
              <div className="w-full h-auto relative flex items-center flex-wrap gap-6">
                {products && products.length > 0 ? (
                  products.slice(0, 4).map((value, key) => {
                    return (
                        <div className="w-1/5" key={key}>

                      <ProductCard
                      productId={value._id}
                       {...value}
                      />
                        </div>

                    );
                  })
                ) : (
                  <div className="w-full relative h-auto flex flex-row gap-6 flex-wrap items-center">
                    {[...Array(4)].map((_, key) => (
                      <DummyCard key={key} />
                    ))}
                  </div>
                )}
              </div>
            </div>
  )
}

export default ProductSection