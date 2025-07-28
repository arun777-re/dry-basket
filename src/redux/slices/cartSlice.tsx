"use client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { RootState } from "../store/store";
import { getRequest, patchRequest, postRequest } from "../services/middleware";
import { ErrorProps } from "@/types/response";
import { CartItem, CartVariant } from "@/types/cart";
import normalizedCart from "@/lib/middleware/normalizedCart";
import { ROUTES } from "@/constants/routes";

export interface Cartitem {
  image?: string;
  productId: string;
  quantity: number;
  productName: string;
  variant: CartVariant;
  addedAtPrice: number;
  categoryOfProduct: string;
}

type NormalizedCartType = ReturnType<typeof normalizedCart>;

interface ActualCart {
  success: boolean;
  message: string;
  status: number;
  data: NormalizedCartType;
}

interface GuestCart {
  success: boolean;
  message: string;
  status: number;
  data: NormalizedCartType;
}
type CartResponse = ActualCart | GuestCart;
interface CartState {
  cart: CartResponse;
  latdata?: Record<string, any>;
  loading: boolean;
  error: ErrorProps;
}

const initialState: CartState = {
  cart: {
    success: false,
    message: "",
    status: 0,
    data: normalizedCart([]),
  },
  loading: false,
  error: {
    success: false,
    message: "",
    status: 400,
  },
  latdata: {},
};

// create input selector
const selectCartItems = (state: RootState) =>
  state.usercart?.cart?.data?.items ?? [];

// memorized derived selector for total price
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((acc, item) => {
    return acc + (item?.variant?.price ?? 0) * item.quantity;
  }, 0)
);

// thunk to get actual cart associated with a user
export const getCart = createAsyncThunk(
  "user/get-cart",
  async (_, { rejectWithValue }) => {
    const response = await getRequest({
      url: "/api/public/cart/get-cart",
      reject: rejectWithValue,
    });

    return response;
  }
);

// thunk to create or update cart when user add items to cart
export const addItemsToCart = createAsyncThunk(
  "user/addto-cart",
  async (payload: { items: CartItem }, { rejectWithValue }) => {
    const response = await postRequest({
      url: "/api/public/cart/create-cart",
      reject: rejectWithValue,
      data: payload,
    });
    return response;
  }
);

export const mergeCart = createAsyncThunk(
  "user/merge-cart",
  async (payload: { items: CartItem[],userId:string }, { rejectWithValue }) => {
    try {
      const response = await postRequest({
        url:`${ROUTES.SERVER_BASE_URL}/v1/public/cart/merge-cart/${payload.userId}`,
        data:payload.items,
        reject:rejectWithValue
      })
      
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserQty = createAsyncThunk(
  "user/update-qty",
  async (
    payload: { productId: string; delta: number },
    { rejectWithValue }
  ) => {
    const response = await patchRequest({
      url: "/api/public/cart/update-qty",
      reject: rejectWithValue,
      data: JSON.stringify(payload),
    });
    return response;
  }
);

export const removeCartItem = createAsyncThunk(
  "user/remove",
  async (payload: { productId: string }, { rejectWithValue }) => {
    const response = await patchRequest({
      url: "/api/public/cart/remove-item",
      reject: rejectWithValue,
      data: JSON.stringify({ productId: payload.productId }),
    });
    return response;
  }
);
export const applyCoupon = createAsyncThunk(
  "user/apply-coupon",
  async (payload: { code: string; cartId: string }, { rejectWithValue }) => {
    const response = await patchRequest({
      url: `/api/public/cart/apply-coupon?cartId=${payload.cartId}`,
      reject: rejectWithValue,
      data: JSON.stringify({ code: payload.code }),
    });
    return response;
  }
);

// thunk to create cart

// getting user lat long from open route service api
export const getUserLatLong = createAsyncThunk(
  "/user/get-lat-lon",
  async (text: string, { rejectWithValue }) => {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${text}&key=${ROUTES.OPEN_CAGE_API_KEY}`,
      {
        method: "GET",
      }
    );
    const res = await response.json();
    console.log("getUserLatLong response: ", res);
    if (!response.ok) {
      return rejectWithValue(res.message || "Failed to fetch user location");
    }
    if (!res.results || res.results.length === 0) {
      return rejectWithValue("No location found for the given text");
    }
    const { lat, lng } = res.results[0].geometry;
    return { lat, lng };
  }
);

type UserDistaqnceProps = {
  fromLat: number;
  fromLong: number;
  toLat: number;
  toLong: number;
};
// getting user lat long from open route service api
export const getUserDistance = createAsyncThunk(
  "/user/get-distance",
  async (data: UserDistaqnceProps, { rejectWithValue }) => {
    const response = await fetch(
      "/api/public/cart/get-distance",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ROUTES.OPEN_ROUTE_API_KEY}`,
        },
        body: JSON.stringify(data),
      }
    );
    const res = await response.json();
    if (!response.ok) {
      return rejectWithValue(res.message || "Failed to fetch user location");
    }
    const distance = res.data.distances[1][0] / 1000;
    console.log('loda',distance)

    return distance
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    createCart: (state, action: PayloadAction<Cartitem>) => {
      if (!Array.isArray(state.cart.data.items)) {
        state.cart.data.items = [];
      }
      const existingItem =
        Array.isArray(state.cart.data.items) &&
        state.cart.data.items.find(
          (item) => item.productId === action.payload.productId
        );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        Array.isArray(state.cart.data.items) &&
          state.cart.data.items.push(action.payload);
      }
      localStorage.setItem("guestCart", JSON.stringify(state.cart.data.items));
    },

    removeCart: (state, action: PayloadAction<string>) => {
      state.cart.data.items = state.cart.data.items.filter(
        (item) => item.productId !== action.payload
      );
      localStorage.setItem("guestCart", JSON.stringify(state.cart.data.items));
    },
    removeItemFromCart: (
      state,
      action: PayloadAction<{ productId: string }>
    ) => {
      if (!state.cart.data?.items) return;
      state.cart.data.items = state.cart.data.items.filter((item) => {
        typeof item.productId !== "string" &&
          item?.productId?._id.toString() !==
            action.payload.productId.toString();
      });
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; delta: number }>
    ) => {
      if (!state.cart.data?.items) return;
      const item = state.cart.data.items.find(
        (item) => String(item.productId) === String(action.payload.productId)
      );
      if (item) {
        item.quantity += action.payload.delta;
        // assigning min quantity to 1
        if (item.quantity < 1) item.quantity = 1;
      }
      localStorage.setItem("guestCart", JSON.stringify(state.cart.data.items));
    },
    clearCart: (state) => {
      state.cart.data.items = [];
      localStorage.removeItem("guestCart");
    },
    updateQuantityLocal: (
      state,
      action: PayloadAction<{ productId: string; delta: number }>
    ) => {
      if (!state.cart.data.items) return;
      const item = state.cart.data.items.find((i) => {
        const itemProductId =
          typeof i.productId !== "string" && i?.productId?._id.toString();
        return itemProductId === action.payload.productId.toString();
      });
      if (item) {
        item.quantity += action.payload.delta;
        if (item.quantity <= 0) item.quantity = 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemsToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
        state.error = {
          message: "",
          status: 0,
          success: true,
        };
      })
      .addCase(getCart.fulfilled, (state, action) => {
        console.log("getCart payload: ", action.payload);
        state.cart = action.payload;
        state.loading = false;
        state.error = {
          success: false,
          status: 0,
          message: "",
        };
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = {
          success: false,
          status: 500,
          message: "Failed to fetch cart",
        };
      })
      .addCase(getCart.pending, (state, action) => {
        state.loading = true;
        state.error = {
          success: false,
          status: 0,
          message: "",
        };
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
        state.error = {
          success: false,
          status: 0,
          message: "",
        };
      })
      .addCase(updateUserQty.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
        state.error = {
          success: true,
          message: "",
          status: 0,
        };
      })

      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
        state.error = {
          success: true,
          message: "",
          status: 200,
        };
      })

      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = {
          success: false,
          message: (action.payload as string) || "Error during remove item",
          status: (action.payload as number) || 400,
        };
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
        state.error = state.error = {
          success: true,
          message: "",
          status: 200,
        };
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = state.error = {
          success: false,
          message: (action.payload as string) || "Error during apply coupon",
          status: 400,
        };
      })
      .addCase(getUserLatLong.fulfilled, (state, action) => {
        state.latdata = action.payload;
        state.loading = false;
        state.error = {
          success: true,
          message: "",
          status: 200,
        };
      });
  },
});

export const {
  createCart,
  clearCart,
  removeCart,
  updateQuantity,
  updateQuantityLocal,
  removeItemFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
