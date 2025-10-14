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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import {
  IncomingAPIResponseFormat,
  PaginatedProductResponse,
} from "@/types/response";
import { ProductIncomingDTO } from "@/types/product";

export const useFetchCategoryProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, products, singleProduct, error } = useSelector(
    (state: RootState) => state.product
  );
  const filterRef = React.useRef(false);
  const singleProductRef = React.useRef(false);
  const allProductCategoryRef = React.useRef(false);
  const fetchCategoryRef = React.useRef(false);


  const fetchCategoryProduct = React.useCallback(
   async (
      {catname,sectionName,setSection}:{catname: string,
      sectionName: string,
      setSection: (value: any) => any}
    ) => {
      if(fetchCategoryRef.current) return;
      fetchCategoryRef.current = true;
      try {
    
     const res = await  dispatch(getFeaturedProduct({ catname, query: { page: 1, limit: 10 } }))
        .unwrap();
        res && setSection(sectionName);
            
      } catch (err) {
         if (err instanceof Error) {
            console.error(err.message);
          } else {
            console.error(err);
          }
      }finally {
fetchCategoryRef.current = false
      }
        
      
    },
    [dispatch]
  );

  // this is used in best product component
  const fetchAllProductsAssociatedWithCategory = React.useCallback(
    async ({
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
      if (allProductCategoryRef.current) return;
      allProductCategoryRef.current = true;
      try {
        await dispatch(
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
      } catch (error) {
      } finally {
        allProductCategoryRef.current = false;
      }
    },
    [dispatch]
  );

  const fetchSingleProductWithSlug = React.useCallback(
    async ({
      slug,
      setProduct,
    }: {
      slug: string;
      setProduct: (value: any) => any;
    }) => {
      if (singleProductRef.current) return;
      singleProductRef.current = true;
      try {
        await dispatch(getSingleProduct(slug))
          .unwrap()
          .then((res: IncomingAPIResponseFormat<ProductIncomingDTO>) => {
            setProduct(res?.data);
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (error) {
      } finally {
        singleProductRef.current = false;
      }
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
      page: number;
      limit: number;
      productName: string;
      category: string;
      setProduct: (value: any) => any;
    }) => {
      dispatch(
        getRelatedProduct({
          category,
          productName,
          page: page ?? 1,
          limit: limit ?? 10,
        })
      )
        .unwrap()
        .then((res: PaginatedProductResponse<ProductIncomingDTO>) => {
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
      page: number;
      limit: number;
      catId: string;
      setProduct: (value: any) => any;
    }) => {
      dispatch(
        getRecommendedProduct({
          catId,
          query: { page: page ?? 1, limit: limit ?? 10 },
        })
      )
        .unwrap()
        .then((res: PaginatedProductResponse<ProductIncomingDTO>) => {
          setProduct(res?.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [dispatch]
  );

  const fetchFilterProducts = React.useCallback(
    async ({
      page,
      limit,
      category,
      productName,
      price,
      weight,
    }: {
      page?: number;
      limit?: number;
      category?: string;
      productName?: string;
      price?: number;
      weight?: string;
    }) => {
      if (filterRef.current) return;
      filterRef.current = true;
      try {
        await dispatch(
          getSearchProductThunk({
            page,
            limit,
            category,
            price,
            productName,
            weight,
          })
        ).unwrap();
      } catch (error) {
      } finally {
        filterRef.current = false;
      }
    },
    [dispatch]
  );

  return {
    fetchCategoryProduct,
    fetchAllProductsAssociatedWithCategory,
    fetchSingleProductWithSlug,
    fetchRelatedProducts,
    fetchRecommendedProducts,
    fetchFilterProducts,
    products,
    singleProduct,
    loading,
    error,
  };
};
