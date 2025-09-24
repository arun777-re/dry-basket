import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ErrorProps, PaginatedProductResponse, PaginationQuery } from "@/types/response";
import { BannerIncomingDTO, BannerState } from "@/types/banner";
import { BANNERAPISFETCH } from "../services/api/banner";
import { defaultError } from "../services/helpers/userresponse";
import { defaultPaginatedBannerResponse } from "../services/helpers/bannerResponse";

const initialState:BannerState = {
  loading: false,
  error: defaultError,
  banners: defaultPaginatedBannerResponse,
  message:""
};

export const getAllBannerThunk = createAsyncThunk<
  PaginatedProductResponse<BannerIncomingDTO>,
  PaginationQuery,
  { rejectValue: ErrorProps }
>("/banner-getall", async (query, { rejectWithValue }) => {
  const res = await BANNERAPISFETCH.getAllBannerOperation({
    reject: rejectWithValue,
    query
  });
  return res;
});
const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
 
    builder.addCase(getAllBannerThunk.fulfilled, (state, action) => {
      state.error = defaultError;
      state.loading = false;
      state.banners = action.payload;
    });
 
  },
});


export default bannerSlice.reducer;