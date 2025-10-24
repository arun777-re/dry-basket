"use client";

import {
  createUser,
  getUserThunk,
  loginUser,
  logoutuser,
  updatePasswordThunk,
  verifyUserThunk,
} from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import {
  LoginProps,
  UpdatePasswordOutgoingDTO,
  UserPropsOutgoing,
} from "@/types/user";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cartHook from "./cartHook";
import { CartItemOutgoingDTO, PopulatedCartItemDTO } from "@/types/cart";
import { ROUTES } from "@/constants/routes";
import { mapPopulatedOurgoing } from "@/lib/middleware/normalizedCart";
import toast from "react-hot-toast";

const authHook = () => {
  const router = useRouter();
  const cartItems: PopulatedCartItemDTO[] =
    useSelector((state: RootState) => state.usercart.cart.data?.items) ?? [];
  const user = useSelector((state: RootState) => state.user.user.success);

  // memorize the outgoing items for cart creation or adding items to cart after login or register
  const outgoingItems: CartItemOutgoingDTO[] = React.useMemo(() => {
    return mapPopulatedOurgoing(cartItems || []) || [];
  }, [cartItems]);

  const hasItems = outgoingItems.length > 0 && !user;

  // refs for deduplication
  const signupRef = React.useRef(false);
  const loginRef = React.useRef(false);
  const logoutRef = React.useRef(false);
  const updatePassRef = React.useRef(false);
  const verifyRef = React.useRef(false);

  const { CREATECARTORADDITEMTOCART } = cartHook();
  const dispatch = useDispatch<AppDispatch>();

  const LOGOUT_USER = React.useCallback(async () => {
    try {
      if (logoutRef.current) return;
      logoutRef.current = true;
      const res = await dispatch(logoutuser());
      return res;
    } catch (error: any) {
      console.error(error.message || "Error occured in auth");
    } finally {
      logoutRef.current = false;
    }
  }, [dispatch]);

  const UPDATE_USER_PASSWORD = React.useCallback(
    async (data: UpdatePasswordOutgoingDTO) => {
      try {
        if (updatePassRef.current) return;
        updatePassRef.current = true;
        const res = await dispatch(updatePasswordThunk(data)).unwrap();
        return res;
      } catch (error: any) {
        console.error(error.message || "Error occured in auth");
      } finally {
        updatePassRef.current = false;
      }
    },
    [dispatch]
  );

 const useRegisterUser = React.useCallback(
  async ({ values }: { values: UserPropsOutgoing; route: string }) => {
    if (signupRef.current) return null;
    signupRef.current = true;

    try {
      const res = await dispatch(createUser(values)).unwrap();
      return res; 
    } catch (error: any) {
      throw error; // propagate error to caller (handleSignUp)
    } finally {
      signupRef.current = false;
    }
  },
  [dispatch, hasItems, outgoingItems]
);


  const useLoginUser = React.useCallback(
    async ({ values, route }: { values: LoginProps; route: string }) => {
      if (loginRef.current) return;
      loginRef.current = true;
      try {
        const res = await dispatch(loginUser(values)).unwrap();
        if (hasItems) {
          CREATECARTORADDITEMTOCART({ data: outgoingItems });
        }
        router.push(`${route}` || ROUTES.HOME);
        return res;
      } catch (error) {
        toast.error("Error in login");
        router.push(`${ROUTES.USER_LOGIN}`);
      } finally {
        loginRef.current = false;
      }
    },
    [dispatch, hasItems, outgoingItems, router, CREATECARTORADDITEMTOCART]
  );
  const verifyUserEmail  = React.useCallback(
    async ({token}: {token:string }) => {
      if (verifyRef.current) return;
      verifyRef.current = true;
      try {
        const res = await dispatch(verifyUserThunk(token)).unwrap();
        if (hasItems) {
          CREATECARTORADDITEMTOCART({ data: outgoingItems });
        }
        router.push(`${ROUTES.HOME}`);
        return res;
      } catch (error) {
        toast.error("Error in verify email");
        router.push(`${ROUTES.USER_LOGIN}`);
      } finally {
        verifyRef.current = false;
      }
    },
    [dispatch, hasItems, outgoingItems, router, CREATECARTORADDITEMTOCART]
  );

  const getUser = React.useCallback(async () => {
    try {
      await dispatch(getUserThunk()).unwrap();
    } catch (error) {
      if (user) {
        toast.error("Error in fetching user");
        router.push(`${ROUTES.USER_LOGIN}`);
      }
    }
  }, [dispatch, user, router]);

  return {
    LOGOUT_USER,
    useRegisterUser,
    useLoginUser,
    getUser,
    UPDATE_USER_PASSWORD,
    verifyUserEmail
  };
};

export default authHook;
