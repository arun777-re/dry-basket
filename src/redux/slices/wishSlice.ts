import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { defaultError } from "../services/helpers/userresponse";
import {
  WishlistIncomingDTO,
  WishlistOutgoingDTO,
  WishSlice,
} from "@/types/wishlist";
import {
  IncomingAPIResponseFormat,
  PaginatedProductResponse,
  PaginationQuery,
} from "@/types/response";
import { ErrorProps } from "@/types/response";
import { WishListAPISFETCH } from "../services/api/wishlist";

const initialState: WishSlice = {
  loading: false,
  error: defaultError,
  wishlist: {
    success: false,
    status: 0,
    message: "",
    data: [],
    hasNextPage: false,
    hasPrevPage: false,
    currentPage: 1,
  },
  message: "",
};

export const createoradditemToWishlistThunk = createAsyncThunk<
  IncomingAPIResponseFormat<void>,
  WishlistOutgoingDTO,
  { rejectValue: ErrorProps }
>("/wishlist/addorcreate", async ({ productId }, { rejectWithValue }) => {
  const res = await WishListAPISFETCH.createOrAddItemToUserWishlist({
    productId,
    reject: rejectWithValue,
  });
  return res;
});
export const removeitemToWishlistThunk = createAsyncThunk<
  IncomingAPIResponseFormat<void>,
  WishlistOutgoingDTO,
  { rejectValue: ErrorProps }
>("/wishlist/remove", async ({ productId }, { rejectWithValue }) => {
  const res = await WishListAPISFETCH.removeItemFromUserWishlist({
    productId,
    reject: rejectWithValue,
  });
  return res;
});
export const clearUserWishlistThunk = createAsyncThunk<
  IncomingAPIResponseFormat<void>,
  void,
  { rejectValue: ErrorProps }
>("/wishlist/clear", async (_, { rejectWithValue }) => {
  const res = await WishListAPISFETCH.clearWishlist({
    reject: rejectWithValue,
  });
  return res;
});
export const getUserWishlistThunk = createAsyncThunk<
  PaginatedProductResponse<WishlistIncomingDTO>,
  PaginationQuery,
  { rejectValue: ErrorProps }
>("/wishlist/get-all", async (query, { rejectWithValue }) => {
  const res = await WishListAPISFETCH.getUserWishlist({
    query,
    reject: rejectWithValue,
  });
  console.log("hello users data comes in slice",res)
  return res;
});

const wishSlice = createSlice({
  name: "wishlist",
  initialState: initialState,
  reducers:{


    removeItemOptimisticUX(state,action:PayloadAction<WishlistOutgoingDTO>){
      if(state.wishlist.data){
      state.wishlist.data?.filter(item => item.productId !== action.payload.productId);
      }
    },
    
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(createoradditemToWishlistThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = defaultError;
        state.message = action.payload.message;
      })

      .addCase(clearUserWishlistThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = defaultError;
        state.message = action.payload.message;
      })

      .addCase(removeitemToWishlistThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = defaultError;
        state.message = action.payload.message;
      })

      .addCase(getUserWishlistThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = defaultError;
        state.wishlist = action.payload;
      });
  },
});


export const {removeItemOptimisticUX} = wishSlice.actions;
export default wishSlice.reducer;
