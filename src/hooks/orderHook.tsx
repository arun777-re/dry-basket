"use client";
import { ROUTES } from "@/constants/routes";
import { VerifyPaymentDTO } from "@/redux/services/api/order";
import {
  cancelOrderThunk,
  createorderthunk,
  getAllOrdersThunk,
  getLatestOredrThunk,
  getSingleOrderAndTrackShipping,
  verifyPaymentThunk,
} from "@/redux/slices/orderSlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import {
  OrderOutgoingReqDTO,
  SEARCHORDERQUERYDTO,
} from "@/types/order";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const orderHook = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.user.success
  );
  // for concurrency use Ref to prevent duplicate calls / double order creation / doesnot trigger re render in other words deduplication.
  const checkOutRef = React.useRef(false);
  const getAllOrdersRef = React.useRef(false);
  const getSuccessOrderRef = React.useRef(false);
  const getSingleOrderRef = React.useRef(false);

  const useHandleCheckout = React.useCallback(
    async ({
      cartId,
      data,
      weight,
    }: {
      cartId: string;
      data: OrderOutgoingReqDTO;
      weight: number;
    }) => {
      if (!isAuthenticated) {
        toast.error("Please login to continue");
        router.push(`${ROUTES.LOGIN}?redirect=${ROUTES.CHECKOUT}`);
        return null;
      }
      if (checkOutRef.current) return null;
      checkOutRef.current = true;
      try {
        const res = await dispatch(
          createorderthunk({ cartId, data, weight })
        ).unwrap();
        return res;
      } catch (error: any) {
        toast.error(error?.message ?? "Checkout failed");
        return null;
      } finally {
        checkOutRef.current = false;
      }
    },
    [dispatch, isAuthenticated, router]
  );

  const useVerifyPayment = React.useCallback(
    async (payload: VerifyPaymentDTO): Promise<boolean> => {
      let success = false;
      await dispatch(verifyPaymentThunk(payload))
        .unwrap()
        .then((res) => {
          success = true;
        })
        .catch((err) => {
          success = false;
        });
      return success;
    },
    [dispatch]
  );

  const getLatestSuccessOrder = React.useCallback(async () => {
    if (!isAuthenticated) {
      router.push(`${ROUTES.LOGIN}`);
    }
    if (getSuccessOrderRef.current) return null;
    getSuccessOrderRef.current = true;
    try {
      const res = await dispatch(getLatestOredrThunk()).unwrap();
      if (res.success) return res.data;
    } catch (error: any) {
      toast.error(error.message ?? "Unable to fetch latest order");
    } finally {
      getSuccessOrderRef.current = false;
    }
  }, [isAuthenticated, router, dispatch]);

  // get all orders
  const GET_ALL_ORDERS = React.useCallback(
    async ({ page, limit }: SEARCHORDERQUERYDTO) => {
      if (!isAuthenticated) {
        router.push(`${ROUTES.LOGIN}`);
      }
      if (getAllOrdersRef.current){ toast.error("request is already on its way");
        return null
      }
        getAllOrdersRef.current = true;
      try {
        const res = await dispatch(getAllOrdersThunk({ page, limit })).unwrap();
        if (res.success) return res;
      } catch (error: any) {
        toast.error(error.message ?? "Unable to fetch latest order");
      } finally {
        getAllOrdersRef.current = false;
      }
    },
    [isAuthenticated,router,dispatch]
  );

  // for plain get and tarck order status
  const GET_SINGLE_ORDER = React.useCallback(async(orderId:string) => {
    if (!isAuthenticated) {
        router.push(`${ROUTES.LOGIN}`);
      }
      if (getSingleOrderRef.current) return null;
      getSingleOrderRef.current = true;
      try {
        const res = await dispatch(getSingleOrderAndTrackShipping(orderId)).unwrap();
        if (res.success) return res;
      } catch (error: any) {
        toast.error(error.message ?? "Unable to fetch complete order");
      } finally {
        getSingleOrderRef.current = false;
      }
  }, [isAuthenticated,router,dispatch]);

  // for cancel order
  const CANCEL_ORDER = React.useCallback(async(orderId:string) => {
     if (!isAuthenticated) {
        router.push(`${ROUTES.LOGIN}`);
      }
      if (getSingleOrderRef.current) return null;
      getSingleOrderRef.current = true;
      try {
        const res = await dispatch(cancelOrderThunk(orderId)).unwrap();
        if (res.success) return res;
      } catch (error: any) {
        toast.error(error.message ?? "Unable to fetch cancel order");
      } finally {
        getSingleOrderRef.current = false;
      }
  }, []);

  return { useHandleCheckout, useVerifyPayment, getLatestSuccessOrder,GET_ALL_ORDERS,GET_SINGLE_ORDER,CANCEL_ORDER };
};

export default orderHook;
