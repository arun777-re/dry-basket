"use client";

import hooksUtil from "@/lib/helpers/hooksHelpers";
import {
  getAllBannerThunk,
} from "@/redux/slices/bannerSlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { PaginationQuery } from "@/types/response";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector} from "react-redux";

const useBannerHook = () => {
  const dispatch = useDispatch<AppDispatch>();

  const loading = useSelector((state:RootState)=>state.banner.loading)

  const getallRef = React.useRef(false);

  const { RUNSAFE_DISPATCH } = hooksUtil();

  const GET_ALL_BANNER = React.useCallback(async (query:PaginationQuery) => {
    try {
      const res = await RUNSAFE_DISPATCH(getallRef, async () =>
        dispatch(getAllBannerThunk(query)).unwrap()
      );
      // stop multiple request at a time or deduplication decreases risks of duplicate calls on server and reduces load on server
     return res.data;
    } catch (error: any) {
      toast.error(error.message);
    }
  },[dispatch,getallRef]);
  return {
    GET_ALL_BANNER,loading
  };
};

export default useBannerHook;
