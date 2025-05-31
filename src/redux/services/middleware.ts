import { Middleware } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

type ApiAction = {
  type: "api/request";
  payload: {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    url: string;
    data?: any;
    headers?: Record<string, any>;
    onSuccess?: string;
    onError?: string;
    successMessage?: string;
    errorMessage?: string;
    withCredentials?: boolean;
  };
};

function isApiAction(action: any): action is ApiAction {
  return (
    typeof action === "object" &&
    action !== null &&
    action.type === "api/request" &&
    typeof action.payload === "object" &&
    action.payload !== null &&
    typeof action.payload.url === "string"
  );
}

export const apiMiddleware: Middleware =
  (store) => (next) => async (action) => {
    if (!isApiAction(action)) {
      return next(action);
    }

    const {
      method = "GET",
      url,
      data,
      headers = {},
      onSuccess,
      onError,
      successMessage,
      errorMessage,
      withCredentials = false,
    } = action.payload;

    try {
      const response = await axios.request({
        method,
        url,
        headers,
        data: method !== "GET" ? data : undefined,
        withCredentials,
      });

      if (successMessage) {
        toast.success(successMessage);
      }

      if (onSuccess) {
        store.dispatch({ type: onSuccess, payload: response.data });
      }
    } catch (error: any) {
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong");
      }

      if (onError) {
        store.dispatch({ type: onError, payload: error.message });
      }
    }
  };
