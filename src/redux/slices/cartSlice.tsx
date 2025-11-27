"use client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { RootState } from "../store/store";
import { ErrorProps, IncomingAPIResponseFormat } from "@/types/response";
import {
  CartItemOutgoingDTO,
  CartState,
  PopulatedCartItemDTO,
  PopulatedIncomingCartDTO,
  UpdateQtyDTO,
} from "@/types/cart";
import { CARTAPI } from "../services/api/cart";
import { defaultError } from "../services/helpers/userresponse";
import { defaultPopulatedCartResponse } from "../services/helpers/cart/cartresponse";
import { createCart, getGuestCart, removeitem, saveGuestCart, updateqty } from "../services/helpers/cart/carthelpers";



const initialState: CartState = {
  cart: {
    success: false,
    message: "",
    status: 0,
    data: defaultPopulatedCartResponse,
  },
  loading: false,
  error: defaultError,
  message: "",
  prevSnapshot:{
    success: false,
    message: "",
    status: 0,
    data: defaultPopulatedCartResponse,
  }
}; 

// create input selector
const selectCartItems = (state: RootState) =>
  state.usercart?.cart?.data?.items ?? [];

console.log("cart items raw:", selectCartItems);

// memorized derived selector for total price
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((acc:number, item:PopulatedCartItemDTO) => {
    return acc + (item?.variant?.priceAfterDiscount ?? 0) * item.quantity;
  }, 0)
);

// total weight of cart items using createSelector from lib reselect;
export const cartTotalItemsWeight = createSelector([selectCartItems],(cartItems)=> cartItems.reduce((acc:number,item:PopulatedCartItemDTO)=>{
  const totalWeigh =  acc + (item.variant.weight * item.quantity);
  return Math.max(totalWeigh,0)
},0));

// get total items in cart
export const totalCartItems = createSelector([selectCartItems],(cartItems) => cartItems.length || 0);

// thunk to get actual cart associated with a user
export const getCart = createAsyncThunk<
  IncomingAPIResponseFormat<PopulatedIncomingCartDTO>,
  void,
  { rejectValue: ErrorProps }
>("user/get-cart", async (_, { rejectWithValue }) => {
  const response = await CARTAPI.getusercart(rejectWithValue);

  return response;
});

// thunk to create/merge or update cart when user add items to cart
export const addItemsToCart = createAsyncThunk<
  IncomingAPIResponseFormat<null>,
  CartItemOutgoingDTO[],
  { rejectValue: ErrorProps }
>("user/addto-cart", async (data, { rejectWithValue }) => {
  const response = await CARTAPI.createcartoradditem({
    data,
    reject: rejectWithValue,
  });
  return response;
});


export const updateItemQty = createAsyncThunk<
  IncomingAPIResponseFormat<PopulatedIncomingCartDTO>,
  UpdateQtyDTO,
  { rejectValue: ErrorProps }
>("user/update-qty", async (payload: UpdateQtyDTO, { rejectWithValue }) => {
  const response = await CARTAPI.updateitemquantity({
    reject: rejectWithValue,
    data: payload,
  });
  return response;
});

export const removeCartItem = createAsyncThunk<
  IncomingAPIResponseFormat<PopulatedIncomingCartDTO>,
  { productId: string },
  { rejectValue: ErrorProps }
>("user/remove", async ({ productId }, { rejectWithValue }) => {
  const response = await CARTAPI.removeitemfromcart({
    reject: rejectWithValue,
    productId: productId,
  });
  return response;
});
export const applyCoupon = createAsyncThunk<
  IncomingAPIResponseFormat<PopulatedIncomingCartDTO>,
  string,
  { rejectValue: ErrorProps }
>("user/apply-coupon", async (code, { rejectWithValue }) => {
  const response = await CARTAPI.applycoupontocart({
    reject: rejectWithValue,
    code,
  });
  return response;
});

export const clearUserCart = createAsyncThunk<
  IncomingAPIResponseFormat<null>,
  void,
  { rejectValue: ErrorProps }
>("user/clear-cart", async (_, { rejectWithValue }) => {
  const response = await CARTAPI.clearcart({ reject: rejectWithValue });
  return response;
});





const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    createCartOptimisticforUX: (
      state,
      action: PayloadAction<PopulatedCartItemDTO>
    ) => {
      // snapshot for rollback
      state.prevSnapshot = JSON.parse(JSON.stringify(state.cart));
      createCart(state,action.payload)
    },
    // Optimistic Remove Item from cart
    removeItemOptimistic: (state, action: PayloadAction<string>) => {
      // snapshot for rollback in case of failure
      state.prevSnapshot = JSON.parse(JSON.stringify(state.cart));
       removeitem(state,action.payload)
    },

    updateQtyOptimistic: (state, action: PayloadAction<UpdateQtyDTO>) => {
      //  snapshot for rollback in case of api failure/thunk failure
      state.prevSnapshot = JSON.parse(JSON.stringify(state.cart));
     updateqty(state,action.payload)
    },
    createOraddItemGuestCart: (
      state,
      action: PayloadAction<PopulatedCartItemDTO>
    ) => {
   createCart(state,action.payload);
     saveGuestCart(state.cart.data!.items)
    },
    removeItemGuestCart: (state, action: PayloadAction<string>) => {
           removeitem(state,action.payload)
          saveGuestCart(state.cart.data!.items)
    },
    updateQtyGuestCart: (state, action: PayloadAction<UpdateQtyDTO>) => {
            updateqty(state,action.payload)
            saveGuestCart(state.cart.data!.items)

    },
    getUserGuestCart: (state) => {
       const guestItems = getGuestCart();
      if (
        guestItems &&
        guestItems.length > 0
      ) {
        state.cart.data!.items = guestItems
      }
    },
    // rollback in case of failure
    rollBackCart: (state) => {
      if(state.prevSnapshot){
        state.cart = state.prevSnapshot ;
        state.prevSnapshot = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemsToCart.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.loading = false;
        state.error = defaultError;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
        state.error = defaultError;
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
        state.error = defaultError;
      })
  
      .addCase(updateItemQty.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
        state.error = defaultError;
      })

      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
        state.error = defaultError;
      })

      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = {
          success: false,
          message:
            (action.payload?.message as string) || "Error during remove item",
          status: (action.payload?.status as number) || 400,
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
        state.error =  action.payload;
      })
      .addCase(clearUserCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.error = defaultError;
        state.loading = false;
      });
  },
});

export const { getUserGuestCart,createCartOptimisticforUX,createOraddItemGuestCart,
  updateQtyGuestCart,updateQtyOptimistic,removeItemGuestCart,removeItemOptimistic
 } = cartSlice.actions;
export default cartSlice.reducer;
