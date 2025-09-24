'use client'

import React from 'react';
import ProductCard from '../_components/card/ProductCard';
import DummyComponent from '../_components/DummyComponent';
import { ProductIncomingDTO, SearchQueryDTO } from '@/types/product';
import { PaginatedProductResponse } from '@/types/response';
import useSearchProductHook from '@/hooks/useSearchProductHook';

type Props = {
  searchValue?:string
}
const Category:React.FC<Props> = ({searchValue}) => {

    const [products,setProducts] = React.useState<PaginatedProductResponse<ProductIncomingDTO>>();
      const limit = 10;
      const [page,setPage] = React.useState<number>(1)
      const { getNavSearchProducts,loading } = useSearchProductHook();
    const searchQuery:SearchQueryDTO = {
      page:page,
      limit:limit,
      searchValue:searchValue
    }
      React.useEffect(()=>{
        let isMounted = true;
        if(!getNavSearchProducts) return;
        (async()=>{
          const result = await getNavSearchProducts({query:searchQuery});
          if(result) setProducts(result);
        })();
        return ()=>{
          isMounted = false;
        }
      },[getNavSearchProducts])
    
  return (
    <section className='max-w-screen w-full h-auto mx-auto relative'>
       <div className="w-full h-auto relative px-30 py-20 flex items-center justify-between flex-wrap gap-8">
          
          {products?.data && Array.isArray(products?.data) && products?.data.length > 0 ? products?.data?.map((item,index)=>{
            return (
                <div key={index} className="w-1/4 relative ">
                <ProductCard productId={item._id} {...item}/>
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