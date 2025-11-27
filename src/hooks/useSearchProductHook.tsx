'use client'
import { SearchQueryDTO } from '@/types/product';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store/store';
import { getNavSearchProductThunk, getWeightsOfProduct } from '@/redux/slices/productSlice';

const useSearchProductHook= () => {
  const navsearchref = React.useRef(false);
  const dispatch = useDispatch<AppDispatch>();
  const {loading,weights} = useSelector((state:RootState)=>state.product);

// get all weight of products
const getallproductsweight = React.useCallback(async()=>{
     await dispatch(getWeightsOfProduct()).unwrap()
},[dispatch])

  // search products hook
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

  return {getNavSearchProducts,loading ,getallproductsweight,weights};
};

export default useSearchProductHook