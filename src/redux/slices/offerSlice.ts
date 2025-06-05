"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteRequest, getRequest, postRequest, putRequest } from "../services/middleware";
import { OfferDocument } from "@/types/offer";
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

export const createoffer = createAsyncThunk(
  "admin/createoffer",
  async (data: Record<string, any>, { rejectWithValue }) => {
    try {
      const res = await postRequest({
        url: "/api/admin/getall-offer",
        data: data,
        reject: rejectWithValue,
      });

      return res;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// thunk to view offers
export const viewoffer = createAsyncThunk(
  "admin/viewoffer",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getRequest({
        url: "/api/admin/getall-offer",

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
        url: `/api/admin/delete-offer?offerId=${offerId}`,

        reject: rejectWithValue,
      });
      return res;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateoffer = createAsyncThunk(
  "admin/updateoffer",
  async ({offerId,data}:{offerId:string,data:Record<string,any>}, { rejectWithValue }) => {
    try {
      const res = await putRequest({
        url: `/api/admin/update-offer?offerId=${offerId}`,
data:data,
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
      .addCase(createoffer.fulfilled, (state, action) => {
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
