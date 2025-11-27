"use client";

import hooksUtil from "@/lib/helpers/hooksHelpers";
import {
  getAllBlogThunk,
  getSingleBlogThunk,
} from "@/redux/slices/blogSlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { PaginationQuery } from "@/types/response";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const useBlogHook = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {loading,singleBlog,blogs} = useSelector((state:RootState)=> state.blog)
 
  const router = useRouter();
  const getsingleRef = React.useRef(false);
  const getallRef = React.useRef(false);

  const { RUNSAFE_DISPATCH } = hooksUtil();

 
  const GET_SINGLE_BLOG = React.useCallback(
    async (slug: string) => {
      try {
        const res = await RUNSAFE_DISPATCH(getsingleRef, async () =>
         await dispatch(getSingleBlogThunk(slug)).unwrap()
        );
        // stop multiple request at a time or deduplication decreases risks of duplicate calls on server and reduces load on server
    return res.data
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [dispatch, router, RUNSAFE_DISPATCH]
  );

  const GET_ALL_BLOG = React.useCallback(async (query:PaginationQuery) => {
    try {
      const res = await RUNSAFE_DISPATCH(getallRef, async () =>
       await dispatch(getAllBlogThunk(query)).unwrap()
      );
      // stop multiple request at a time or deduplication decreases risks of duplicate calls on server and reduces load on server
    return res.data;
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [ dispatch, router, RUNSAFE_DISPATCH]);

  return {
    GET_ALL_BLOG,
    GET_SINGLE_BLOG,
    loading,
    singleBlog,
    blogs
  };
};

export default useBlogHook;
