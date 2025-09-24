'use client'
import { ProductIncomingDTO, SearchQueryDTO } from '@/types/product';
import React from 'react'
import { useFetchCategoryProducts } from './fetchCategoryProduct';
import { useSearchParams } from 'next/navigation';
import { PaginatedProductResponse } from '@/types/response';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store/store';
import { getNavSearchProductThunk } from '@/redux/slices/productSlice';

const useSearchProductHook= () => {
  const [products, setProducts] = React.useState<PaginatedProductResponse<ProductIncomingDTO>>();
  const searchParams = useSearchParams();
  const { fetchSearchProducts } = useFetchCategoryProducts();
  const navsearchref = React.useRef(false);
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state:RootState)=>state.product.loading)

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

const getNavSearchProducts = React.useCallback(async({query}:{query:SearchQueryDTO})=>{
try {
  if(navsearchref.current) return;
  navsearchref.current = true;

const res = await  dispatch(getNavSearchProductThunk(query)).unwrap();
return res;
} catch (error) {
  console.error('Error fetching navigation search products:', error);
  throw new Error('Failed to fetch navigation search products');
}finally{
  navsearchref.current = false; // reset the ref after the fetch
}
  },[navsearchref,dispatch,getNavSearchProductThunk])

  return { products,getNavSearchProducts,loading };
};

export default useSearchProductHook