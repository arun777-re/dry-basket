"use client";
import React from "react";
import {
  getCategoryProduct,
  getFeaturedProduct,
  getRecommendedProduct,
  getRelatedProduct,
  getSearchProductThunk,
  getSingleProduct,
} from "@/redux/slices/productSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import {
  IncomingAPIResponseFormat,
  PaginatedProductResponse,
} from "@/types/response";
import { ProductIncomingDTO } from "@/types/product";

export const useFetchCategoryProducts = () => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchCategoryProduct = React.useCallback(
    (
      catname: string,
      sectionName: string,
      setProduct: (value: any) => any,
      setSection: (value: any) => any
    ) => {
      dispatch(getFeaturedProduct({ catname, query: { page: 1, limit: 10 } }))
        .unwrap()
        .then((res: PaginatedProductResponse<ProductIncomingDTO>) => {
          setProduct(res?.data);
          setSection(sectionName);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [dispatch]
  );

  const fetchAllProductsAssociatedWithCategory = React.useCallback(
    ({
      catname,
      page,
      limit,
      setProducts,
    }: {
      catname: string;
      page: number;
      limit: number;
      setProducts: (value: any) => any;
    }) => {
      dispatch(
        getCategoryProduct({
          catname,
          query: { page: page ?? 1, limit: limit ?? 10 },
        })
      )
        .unwrap()
        .then((res: PaginatedProductResponse<ProductIncomingDTO>) => {
          setProducts(res?.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [dispatch]
  );

  const fetchSingleProductWithSlug = React.useCallback(
    ({
      slug,
      setProduct,
    }: {
      slug: string;
      setProduct: (value: any) => any;
    }) => {
      dispatch(getSingleProduct(slug))
        .unwrap()
        .then((res: IncomingAPIResponseFormat<ProductIncomingDTO>) => {
          setProduct(res?.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [dispatch]
  );

  const fetchRelatedProducts = React.useCallback(
    ({
      page,
      limit,
      category,
      productName,
      setProduct,
    }: {
      page:number,
      limit:number,
      productName: string;
      category: string;
      setProduct: (value: any) => any;
    }) => {
      dispatch(getRelatedProduct({ category, productName, page:page ?? 1, limit:limit ?? 10 }))
        .unwrap()
        .then((res:PaginatedProductResponse<ProductIncomingDTO>) => {
          setProduct(res?.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [dispatch]
  );

  // fetch recommended products
  const fetchRecommendedProducts = React.useCallback(
    ({
      page,
      limit,
      catId,
      setProduct,
    }: {
      page:number,
      limit:number,
      catId: string;
      setProduct: (value: any) => any;
    }) => {
      dispatch(getRecommendedProduct({catId,query:{page:page ?? 1, limit:limit ?? 10} }))
        .unwrap()
        .then((res:PaginatedProductResponse<ProductIncomingDTO>) => {
          setProduct(res?.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [dispatch]
  );

  const fetchSearchProducts = React.useCallback(async({page,limit,category,productName,price,setProducts}:{
page?:number,limit?:number,category?:string,productName?:string,price?:number,setProducts:(value:any)=>any
  })=>{
dispatch(getSearchProductThunk({page,limit,category,price,productName})).unwrap().then((res)=>{
      setProducts(res)
}) .catch((err) => {
          console.error(err);
        });
  },[dispatch])

  return {
    fetchCategoryProduct,
    fetchAllProductsAssociatedWithCategory,
    fetchSingleProductWithSlug,
    fetchRelatedProducts,
    fetchRecommendedProducts,
    fetchSearchProducts
  };
};
