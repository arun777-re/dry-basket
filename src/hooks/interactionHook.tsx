"use client";

import { createInteractionThunk } from "@/redux/slices/interactionSlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { InteractionOutgoingDTO } from "@/types/interaction";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const useInteractionHook = () => {
  const interactRef = React.useRef<boolean>(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.user.success
  );
  const dispatch = useDispatch<AppDispatch>();

  const getUserInteraction = React.useCallback(
    async ({ productId, action }: InteractionOutgoingDTO) => {
      if (!isAuthenticated) return;
      if (interactRef.current) return;
      interactRef.current = true;
      try {
        await dispatch(createInteractionThunk({ productId, action })).unwrap();
      } catch (error) {
        console.error(error || "Error during get Users Interactions");
      } finally {
        interactRef.current = false;
      }
    },
    [dispatch,isAuthenticated]
  );

  return { getUserInteraction };
};

export default useInteractionHook;
