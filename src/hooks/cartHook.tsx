"use client";

import {
  addItemsToCart,
  applyCoupon,
  clearUserCart,
  createCartOptimisticforUX,
  createOraddItemGuestCart,
  getCart,
  getUserGuestCart,
  removeCartItem,
  updateItemQty,
} from "@/redux/slices/cartSlice";
import { AppDispatch, RootState, store } from "@/redux/store/store";
import {
  CartItemOutgoingDTO,
  PopulatedCartItemDTO,
  UpdateQtyDTO,
} from "@/types/cart";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const cartHook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user.success);
  const userCart = useSelector((state: RootState) => state.usercart.cart);

  const applycouponRef = React.useRef(false);
  const cartaddRef = React.useRef(false);
  const cartremoveRef = React.useRef(false);
  const cartupdateRef = React.useRef(false);
  const cartcreateRef = React.useRef(false);

  const CREATECARTORADDITEMTOCART = React.useCallback(
    async ({ data }: { data: CartItemOutgoingDTO[] }) => {
      if (cartcreateRef.current) return;
      cartcreateRef.current = true;
      try {
        await dispatch(addItemsToCart(data));
        toast.success("Product added to cart");
      } catch (error: any) {
        console.error(
          "Error during add item to cart or create cart",
          error.message
        );
        toast.error(error.message || "Something went wrong");
      } finally {
        cartcreateRef.current = false;
      }
    },
    [dispatch]
  );

  const GETUSERCART = React.useCallback(async () => {
    const res = await dispatch(getCart()).unwrap();
    localStorage.removeItem("guest_cart");
    return res.data;
  }, [dispatch]);

  const UPDATE_ITEM_QTY = React.useCallback(
    async ({
      payload,
      setUserCart,
    }: {
      setUserCart: (value: any) => any;
      payload: UpdateQtyDTO;
    }) => {
      if (cartupdateRef.current) return;
      cartupdateRef.current = true;
      try {
        const { productId, delta } = payload;
        await dispatch(updateItemQty({ productId, delta }))
          .unwrap()
          .then((res) => {
            localStorage.removeItem("guest_cart");
            setUserCart(res?.data);
          });
      } catch (error: any) {
        console.error("Error during update item qty", error.message);
        toast.error(error.message || "Something went wrong");
      } finally {
        cartupdateRef.current = false;
      }
    },
    [dispatch]
  );

  const REMOVE_ITEM_FROM_CART = React.useCallback(
    async ({
      productId,
      setUserCart,
    }: {
      productId: string;
      setUserCart: (value: any) => any;
    }) => {
      if (cartremoveRef.current) return;
      cartremoveRef.current = true;
      try {
        await dispatch(removeCartItem({ productId }))
          .unwrap()
          .then((res) => {
            localStorage.removeItem("guest_cart");
            setUserCart(res?.data);
          });
      } catch (error: any) {
        console.error("Error during remove item from cart", error.message);
        toast.error(error.message || "Something went wrong");
      } finally {
        cartremoveRef.current = false;
      }
    },
    [dispatch]
  );

  const APPLY_COUPON = React.useCallback(
    async (code: string) => {
      if (applycouponRef.current) return;
      try {
        applycouponRef.current = true;

        const res = await dispatch(applyCoupon(code));

        if (applyCoupon.rejected.match(res)) {
          toast.error(
            typeof res.payload === "string"
              ? res.payload
              : "Failed to apply coupon"
          );
        } else if (applyCoupon.fulfilled.match(res)) {
          const savedAmount = Math.max(
            0,
            (res.payload.data?.total || 0) - (res.payload.data?.finalTotal || 0)
          );
          toast.success(
            <p className="text-sm">{`You saved Rs${savedAmount}`}</p>
          );
        }
      } catch (error: any) {
        console.error("Error applying coupon:", error);
        toast.error(error.message || "Failed to apply coupon");
      } finally {
        applycouponRef.current = false;
      }
    },
    [dispatch, applyCoupon]
  );

  const CLEAR_CART = React.useCallback(async () => {
    await dispatch(clearUserCart());
  }, [dispatch]);

  // for get request
  const handleCartItems = async () => {
    try {
      if (user) {
        await GETUSERCART();
      } else {
        dispatch(getUserGuestCart());
        const updatedCart = store.getState().usercart.cart;
        return updatedCart;
      }
    } catch (error: any) {
      console.error(error.message || "error during get cart items");
    }
  };

  //  for add item to cart
  const addToCart = async ({
    e,
    payload,
    backendpayload,
  }: {
    e: React.MouseEvent<HTMLOrSVGElement>;
    payload: PopulatedCartItemDTO[];
    backendpayload: CartItemOutgoingDTO[];
  }) => {
    e.stopPropagation();
    if (cartaddRef.current) return;
    cartaddRef.current = true;
    try {
      if (user) {
        if (
          userCart.data &&
          userCart.data &&
          userCart.data.items &&
          userCart.data.items.length > 0
        ) {
          payload.forEach((item) => dispatch(createCartOptimisticforUX(item)));
        }
        await CREATECARTORADDITEMTOCART({ data: backendpayload });
      } else {
        // for guest cart
        payload.forEach((item) => dispatch(createOraddItemGuestCart(item)));
        toast.success("Product added to cart");
      }
    } catch (error: any) {
      console.error("Error adding to cart", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      cartaddRef.current = false;
    }
  };

  return {
    CREATECARTORADDITEMTOCART,
    GETUSERCART,
    UPDATE_ITEM_QTY,
    REMOVE_ITEM_FROM_CART,
    APPLY_COUPON,
    CLEAR_CART,
    handleCartItems,
    addToCart,
  };
};

export default cartHook;
