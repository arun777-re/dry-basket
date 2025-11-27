"use client";

import {
  clearUserWishlistThunk,
  createoradditemToWishlistThunk,
  getUserWishlistThunk,
  removeItemOptimisticUX,
  removeitemToWishlistThunk,
} from "@/redux/slices/wishSlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { PaginationQuery } from "@/types/response";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const useWishlistHook = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.user?.success
  );

  const { loading, wishlist } = useSelector(
    (state: RootState) => state.wishlist
  );

  // --- Prevent duplicate clicks ---
  const addItemRef = React.useRef<boolean>(false);
  const removeItemRef = React.useRef<boolean>(false);
  const clearRef = React.useRef<boolean>(false);
  const getAllRef = React.useRef<boolean>(false);

  // --- Add item to wishlist ---
  const createOrAddItemToWishlist = React.useCallback(
    async ({ productId }: { productId: string }) => {
      if (!isAuthenticated) {
        toast.error("You need to sign up first");
        return;
      }
      if (addItemRef.current) return;
      addItemRef.current = true;
      try {
        await dispatch(createoradditemToWishlistThunk({ productId })).unwrap();
        toast.success("Product added to wishlist");
      } catch (error: any) {
        toast.error(error?.message || "Failed to add item");
      } finally {
        addItemRef.current = false;
      }
    },
    [dispatch, isAuthenticated]
  );

  // --- Remove item from wishlist ---
  const removeItemFromWishlist = React.useCallback(
    async ({ productId }: { productId: string }) => {
      if (!isAuthenticated) {
        toast.error("You need to sign up first");
        return;
      }
      if (removeItemRef.current) return;
      removeItemRef.current = true;
      try {
       await Promise.all([
            await dispatch(removeitemToWishlistThunk({ productId })).unwrap(),
          dispatch(removeItemOptimisticUX({productId}))
        ])
      
      } catch (error: any) {
        toast.error(error?.message || "Failed to remove item");
      } finally {
        removeItemRef.current = false;
      }
    },
    [dispatch, isAuthenticated]
  );

  // --- Clear wishlist ---
  const clearWishlist = React.useCallback(async () => {
    if (!isAuthenticated) {
      toast.error("You need to sign up first");
      return;
    }
    if (clearRef.current) return;
    clearRef.current = true;
    try {
      await dispatch(clearUserWishlistThunk()).unwrap();
      toast.success("Wishlist cleared");
    } catch (error: any) {
      toast.error(error?.message || "Failed to clear wishlist");
    } finally {
      clearRef.current = false;
    }
  }, [dispatch, isAuthenticated]);

  // --- Get all wishlist items ---
  const getWishlist = React.useCallback(
    async ({ query }: { query: PaginationQuery }) => {
      if (!isAuthenticated) {
        toast.error("You need to sign up first");
        return;
      }
      if (getAllRef.current) return;
      getAllRef.current = true;
      try {
        await dispatch(
          getUserWishlistThunk({ page: query.page, limit: query.limit })
        ).unwrap();
      } catch (error: any) {
        toast.error(error?.message || "Failed to load wishlist");
      } finally {
        getAllRef.current = false;
      }
    },
    [dispatch, isAuthenticated]
  );

  return {
    createOrAddItemToWishlist,
    getWishlist,
    clearWishlist,
    removeItemFromWishlist,
    loading,
    wishlist,
  };
};


export default useWishlistHook;
