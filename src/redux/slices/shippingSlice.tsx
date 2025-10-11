import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { defaultError } from "../services/helpers/userresponse";
import { IncomingAPIResponseFormat } from "@/types/response";
import { ErrorProps } from "@/types/response";
import { SHIPPINGAPI } from "../services/api/shipping";

const initialState = {
  loading: false,
  error: defaultError,
  shippingCharges: 0,
  message:""
};

type ShippingRate = { weight: number; pincode: number,amount:number };

export const getShippingCharges = createAsyncThunk<
  IncomingAPIResponseFormat<number>,
  ShippingRate,
  { rejectValue: ErrorProps }
>(
  "shipping/rate-calculator",
  async ({ weight, pincode,amount }, { rejectWithValue }) => {
    const res = await SHIPPINGAPI.getshippingcharges({
      weight,
      pincode,
      amount,
      reject: rejectWithValue,
    });
    return res;
  }
);

export const createOrderAndAssignOrderForShipment = createAsyncThunk<
IncomingAPIResponseFormat<null>,
string,
{rejectValue:ErrorProps}
>('create-shipment',async(orderId,{rejectWithValue})=>{
  const response = await SHIPPINGAPI.createandassignordertoshipment({orderId,reject:rejectWithValue});
  return response;
})

const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getShippingCharges.fulfilled, (state, action) => {
        state.error = defaultError;
        state.loading = false;
        state.shippingCharges = action.payload.data!
    })
    .addCase(createOrderAndAssignOrderForShipment.fulfilled,(state,action)=>{
      state.error = defaultError;
      state.loading = false;
      state.message = action.payload.message;
    })
  },
});


export default shippingSlice.reducer;
