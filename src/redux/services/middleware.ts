import { Middleware } from "@reduxjs/toolkit";

import axios from "axios";
import { store } from "../store/store";

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
    auth?: boolean;
    withCredentials?:boolean;
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
      onSuccess,
      onError,
      headers = {},
      successMessage,
      errorMessage,
      auth = false,
      withCredentials = false
    } = action.payload;
    try {
const config = 
{
    method,
    url,
    data,
    headers,
    withCredentials
}

      let response;

      switch (method.toUpperCase()) {
        case "GET":
          response = await axios.get(url);
          break;
        case "POST":
          response = await axios.post(url, data);
          break;

        case "PUT":
          response = await axios.put(url, data);
          break;
        case "DELETE":
          response = await axios.delete(url);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      if (onSuccess) {
        store.dispatch({ type: onSuccess, payload: response.data });
      }
    } catch (error: any) {
      if (onError) {
        store.dispatch({ type: onError, payload: error.message });
      }
    }
  };
