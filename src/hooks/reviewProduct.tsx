"use client";

import { createReviewThunk, getReviewThunk } from "@/redux/slices/reviewSlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { ReviewOutgoingDTO } from "@/types/review";
import { useCallback, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const reviewProduct = () => {
  const dispatch = useDispatch<AppDispatch>();

// get reviews and loading from state
const {review,loading} = useSelector((state:RootState)=> state.review)

  // get user from redux
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.user.success
  );
// Track in-flight fetches to prevent duplicate network calls
const inFlightFetches = useRef<Map<string,Promise<any>>>(new Map());

  // centralized auth check
  const requireAuth = useCallback((message:string)=>{
    if(!isAuthenticated){
      toast.error(message);
      return false;
    }
    return true;
  },[isAuthenticated])


  const getReviewsOfProduct = useCallback(async ({
    productId,
  }: {
    productId: string;
  }) => {
   
   await dispatch(getReviewThunk(productId))
        .unwrap();
        
  },[dispatch, getReviewThunk, isAuthenticated]);

  const reviewAProduct = useCallback(async ({
    data,
    productId,
  }: {
    data: ReviewOutgoingDTO;
    productId: string;
  }) => {
    if (!requireAuth("Please login to review a product")) return;
    // prevent duplicate submissions/parallel api calls
     if (inFlightFetches.current.has(productId)) {
      return inFlightFetches.current.get(productId);
    }
      await dispatch(createReviewThunk({ data, productId })).unwrap().then((res)=>{
        toast.success("Review submitted successfully!");
          inFlightFetches.current.set(productId, Promise.resolve(res.data));

      }).catch((error) => {
        console.error("Review submission failed:", error);
        toast.error("Failed to submit review.");
      }).finally(()=>{
      inFlightFetches.current.delete(productId); // remove from in-flight map after completion
      });
  },[dispatch, createReviewThunk, isAuthenticated]);

  return { reviewAProduct, getReviewsOfProduct,review,loading };
};

export default reviewProduct;
