'use client'
import { ProductIncomingDTO, SearchQueryDTO } from '@/types/product';
import React from 'react'
import { useFetchCategoryProducts } from './fetchCategoryProduct';
import { useSearchParams } from 'next/navigation';
import { PaginatedProductResponse } from '@/types/response';

const useSearchProductHook= () => {
  const [products, setProducts] = React.useState<PaginatedProductResponse<ProductIncomingDTO>>();
  const searchParams = useSearchParams();
  const { fetchSearchProducts } = useFetchCategoryProducts();

  React.useEffect(() => {
    let active = true;
    const category = searchParams.get('category') || '';
    const productName = searchParams.get('productName') || '';
    const priceStr = searchParams.get('price') || '';

    const query: SearchQueryDTO = {
      category,
      productName,
      price: priceStr ? Number(priceStr) : undefined,
      page: 1,
      limit: 10,
    };

    if (category || productName || priceStr) {
      fetchSearchProducts({ ...query, setProducts });
    }

    return () =>{
        active = false;
    }
  }, [searchParams, fetchSearchProducts]);

  return { products };
};

export default useSearchProductHook