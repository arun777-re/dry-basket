"use client";

import { viewCategory } from "@/redux/slices/categorySlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";


const useCategoryHook = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {category,loading,error} = useSelector((state:RootState)=> state.category);

  const categoryRef = React.useRef(false);

  const get_all_category = React.useCallback(async() => {
    if (categoryRef.current) return;
        categoryRef.current = true;
    try {
      const categories = await dispatch(viewCategory()).unwrap();
      return categories;
    } catch (error) {
    } finally {
      categoryRef.current = false;
    }
  }, [dispatch,viewCategory]);

  return { get_all_category,category,loading,error };
};

export default useCategoryHook;
