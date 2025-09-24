import { ErrorProps, IncomingAPIResponseFormat, PaginatedProductResponse } from "@/types/response";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { defaultError } from "../services/helpers/userresponse";
import { ORDERAPI, VerifyPaymentDTO } from "../services/api/order";
import {
  CreateOrderIncomingReqDTO,
  OrderIncomingReqDTO,
  OrderOutgoingReqDTO,
  SEARCHORDERQUERYDTO,
} from "@/types/order";
import { paginatedOrderResponse } from "../services/helpers/order/orderResponse";

type OrderProps = {
  error: ErrorProps;
  loading: boolean;
  order: Record<string, any>;
  message: string;
  orders:PaginatedProductResponse<OrderIncomingReqDTO>
};

const initialState: OrderProps = {
  error: defaultError,
  loading: false,
  order: {},
  message: "",
  orders:paginatedOrderResponse
};

type Props = {
  cartId: string;
  data: OrderOutgoingReqDTO;
  weight: number;
};

export const createorderthunk = createAsyncThunk<
  IncomingAPIResponseFormat<CreateOrderIncomingReqDTO>,
  Props,
  { rejectValue: ErrorProps }
>("order/create", async ({ data, cartId, weight }, { rejectWithValue }) => {
  const response = await ORDERAPI.CREATE_ORDER({
    cartId,
    data,
    weight,
    reject: rejectWithValue,
  });
  return response;
});

export const verifyPaymentThunk = createAsyncThunk<
  IncomingAPIResponseFormat<null>,
  VerifyPaymentDTO,
  { rejectValue: ErrorProps }
>(
  "verify-payment",
  async (
    { razorpay_order_id, razorpay_payment_id, razorpay_signature },
    { rejectWithValue }
  ) => {
    const res = await ORDERAPI.VERIFY_PAYMET({
      reject: rejectWithValue,
      data: { razorpay_order_id, razorpay_payment_id, razorpay_signature },
    });
    return res;
  }
);

export const getLatestOredrThunk = createAsyncThunk<
  IncomingAPIResponseFormat<OrderIncomingReqDTO>,
  void,
  { rejectValue: ErrorProps }
>("latest-order", async (_, { rejectWithValue }) => {
  const res = await ORDERAPI.GET_LATEST_ORDER(rejectWithValue);
  return res;
});

export const getSingleOrderAndTrackShipping = createAsyncThunk<IncomingAPIResponseFormat<OrderIncomingReqDTO>,
string,
{rejectValue:ErrorProps}
>(
  "getand-track-order",
  async (orderId,{rejectWithValue}) => {
    const res = await ORDERAPI.GET_SINGLE_ORDER({reject:rejectWithValue,orderId});
    return res;
  }
);

export const getAllOrdersThunk = createAsyncThunk<
PaginatedProductResponse<OrderIncomingReqDTO>,
SEARCHORDERQUERYDTO,
{rejectValue:ErrorProps}
>("getall-orders", async ({page,limit},{rejectWithValue}) => {
   const res = await ORDERAPI.GET_ALL_ORDERS({reject:rejectWithValue,query:{page,limit}});
   return res;
});

export const cancelOrderThunk = createAsyncThunk<
IncomingAPIResponseFormat<null>,
string,
{rejectValue:ErrorProps}
>("cancel-order", async (orderId,{rejectWithValue}) => {
    const res = await ORDERAPI.CANCEL_ORDER({reject:rejectWithValue,orderId});
    return res;
});

// export const returnOrder = createAsyncThunk<>("getall-orders", async () => {});

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createorderthunk.fulfilled, (state, action) => {
        state.order = action.payload;
        state.error = defaultError;
        state.loading = false;
      })
      .addCase(verifyPaymentThunk.fulfilled, (state, action) => {
        state.error = defaultError;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(getLatestOredrThunk.fulfilled, (state, action) => {
        state.error = defaultError;
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getLatestOredrThunk.pending, (state, action) => {
        state.error = defaultError;
        state.loading = true;
      })
      .addCase(getAllOrdersThunk.fulfilled,(state,action)=>{
        state.error = defaultError;
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrdersThunk.pending,(state,action)=>{
        state.error = defaultError;
        state.loading = true;
      })
      .addCase(getAllOrdersThunk.rejected,(state,action)=>{
        state.error = action.payload!;
        state.loading = false;
      })
      .addCase(cancelOrderThunk.rejected,(state,action)=>{
        state.loading = false;
        state.error = defaultError;
        state.message = action.payload?.message!
      })
      .addCase(getSingleOrderAndTrackShipping.pending,(state,action)=>{
        state.loading = true;
        state.error = defaultError;
      })
      .addCase(getSingleOrderAndTrackShipping.fulfilled,(state,action)=>{
        state.loading = false;
        state.error = defaultError;
        state.order = action.payload;
      })

  },
});

export default orderSlice.reducer;
