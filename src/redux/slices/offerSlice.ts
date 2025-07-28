"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  postRequest,
  patchRequest,
} from "../services/middleware";
import { OfferDocument, OfferFormValues } from "@/types/offer";
import { ROUTES } from "@/constants/routes";
export interface ErrorProps {
  status: number;
  message: string;
  success: boolean;
  data?: any;
}

export interface offerProps {
  status: number;
  message: string;
  success: boolean;
  data?: OfferDocument;
}
interface valueProps {
  loading: boolean;
  error: ErrorProps;
  offer: offerProps[];
}
const initialValues: valueProps = {
  loading: false,
  error: {
    status: 0,
    message: "",
    success: false,
    data: null,
  },
  offer: [
    {
      status: 0,
      message: "",
      success: false,
      data: {
        _id: "",
        code: "",
        description: "",
        timesUsed: 0,
        usageLimit: 0,
        value: 0,
        active: true,
        expiresAt: new Date(),
        discountType: "percentage",
        appliesToCategories: [],
      },
    },
  ],
};

// thunk to create offer by admin
export const createOffer = createAsyncThunk(
  "admin/create-offer",
  async (formData: OfferFormValues, { rejectWithValue }) => {
    console.log('hello:',formData);
    const response = await postRequest({
      url: `${ROUTES.SERVER_BASE_URL}/v1/admin/offer/create`,
      data: formData,
      reject: rejectWithValue,
    });
    return response;
  }
);

// thunk to view offers
export const viewoffer = createAsyncThunk(
  "admin/viewoffer",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getRequest({
        url: `${ROUTES.SERVER_BASE_URL}/v1/admin/offer/getAll`,

        reject: rejectWithValue,
      });

      return res;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
// thunk to delete offers
export const deleteoffer = createAsyncThunk(
  "admin/deleteoffer",
  async (offerId: string, { rejectWithValue }) => {
    try {
      const res = await deleteRequest({
        url: `${ROUTES.SERVER_BASE_URL}/v1/admin/offer/delete/?offerId=${offerId}`,

        reject: rejectWithValue,
      });
      return res;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// update offer
export const updateoffer = createAsyncThunk(
  "admin/updateoffer",
  async (
    { offerId, data }: { offerId: string; data:Record<string,any>},
    { rejectWithValue }
  ) => {
    try {
      console.log('data',data)
      console.log('data....',offerId)
      const stringifyData = JSON.stringify(data)
      const res = await patchRequest({
        url: `${ROUTES.SERVER_BASE_URL}/v1/admin/offer/update?offerId=${offerId}`,
        data:stringifyData,
        reject: rejectWithValue,
      });
      return res;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const offerSlice = createSlice({
  name: "offer",
  initialState: initialValues,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOffer.fulfilled, (state, action) => {
        state.error = {
          success: false,
          message: "",
          status: 0,
        };
        state.loading = false;
        state.offer = action.payload;
      })
      .addCase(viewoffer.fulfilled, (state, action) => {
        state.error = {
          success: false,
          message: "",
          status: 0,
        };
        state.loading = false;
        state.offer = action.payload;
      });
  },
});

export default offerSlice.reducer;
