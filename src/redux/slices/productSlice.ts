"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ErrorProps,
  IncomingAPIResponseFormat,
  PaginatedProductResponse,
} from "@/types/response";
import { PRODUCTAPI } from "../services/api/product";
import { ProductIncomingDTO, SearchQueryDTO } from "@/types/product";
import {
  defaultProductState,
  singleProductState,
} from "../services/helpers/productresponse";
import { defaultError } from "../services/helpers/userresponse";

interface productsType {
  loading: boolean;
  error?: ErrorProps;
  products: PaginatedProductResponse<ProductIncomingDTO>;
  singleProduct: IncomingAPIResponseFormat<ProductIncomingDTO>;
  weights: number[];
}

const initialState: productsType = {
  loading: false,
  error: defaultError,
  products: defaultProductState,
  singleProduct: singleProductState,
  weights: [],
};

// public routes

// get single product
export const getSingleProduct = createAsyncThunk<
  IncomingAPIResponseFormat<ProductIncomingDTO>,
  string,
  { rejectValue: ErrorProps }
>("public/get-single-product", async (slug, { rejectWithValue }) => {
  const response = await PRODUCTAPI.getsingleproduct({
    slug,
    reject: rejectWithValue,
  });
  return response;
});

// get all featured products
export const getFeaturedProduct = createAsyncThunk<
  PaginatedProductResponse<ProductIncomingDTO>,
  {
    query: SearchQueryDTO;
    catname: string;
  },
  { rejectValue: ErrorProps }
>(
  "/public/get-featured-product",
  async ({ catname, query }, { rejectWithValue }) => {
    const response = await PRODUCTAPI.getfeaturedproduct({
      catname,
      reject: rejectWithValue,
      params: query,
    });
    return response;
  }
);

// get search products
export const getSearchProductThunk = createAsyncThunk<
  PaginatedProductResponse<ProductIncomingDTO>,
  SearchQueryDTO,
  { rejectValue: ErrorProps }
>("product/search", async (query, { rejectWithValue }) => {
  const response = await PRODUCTAPI.getsearchproducts({
    params: query,
    reject: rejectWithValue,
  });
  return response;
});
// get search products
export const getNavSearchProductThunk = createAsyncThunk<
  PaginatedProductResponse<ProductIncomingDTO>,
  SearchQueryDTO,
  { rejectValue: ErrorProps }
>("product/navsearch", async (query, { rejectWithValue }) => {
  const response = await PRODUCTAPI.getnavsearchproducts({
    params: query,
    reject: rejectWithValue,
  });
  return response;
});

// get related products
export const getRelatedProduct = createAsyncThunk<
  PaginatedProductResponse<ProductIncomingDTO>,
  SearchQueryDTO,
  { rejectValue: ErrorProps }
>("/public/get-related-product", async (query, { rejectWithValue }) => {
  const response = await PRODUCTAPI.getrelatedproducts({
    reject: rejectWithValue,
    params: query,
  });
  return response;
});

// get recommended products
export const getRecommendedProduct = createAsyncThunk<
  PaginatedProductResponse<ProductIncomingDTO>,
  {
    catId: string;
    query: SearchQueryDTO;
  },
  { rejectValue: ErrorProps }
>(
  "/public/get-recommended-product",
  async ({ catId, query }, { rejectWithValue }) => {
    const response = await PRODUCTAPI.getrecommendedproducts({
      params: query,
      catId,
      reject: rejectWithValue,
    });
    return response;
  }
);

// get product by category
export const getCategoryProduct = createAsyncThunk<
  PaginatedProductResponse<ProductIncomingDTO>,
  { catname: string; query: SearchQueryDTO },
  { rejectValue: ErrorProps }
>(
  "/public/get-category-product",
  async ({ catname, query }, { rejectWithValue }) => {
    const response = await PRODUCTAPI.getallcategoryproducts({
      params: query,
      catname,
      reject: rejectWithValue,
    });
    return response;
  }
);

// get product by category
export const getWeightsOfProduct = createAsyncThunk<
  IncomingAPIResponseFormat<[]>,
  void,
  { rejectValue: ErrorProps }
>("/public/get-weightof-product", async (_, { rejectWithValue }) => {
  const response = await PRODUCTAPI.getweightofproducts({
    reject: rejectWithValue,
  });
  return response;
});

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.error = { success: false, message: "", status: 0 };
        state.singleProduct = action.payload;
        state.loading = false;
      })
      .addCase(getFeaturedProduct.fulfilled, (state, action) => {
        state.error = { success: false, message: "", status: 0 };
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getSearchProductThunk.fulfilled, (state, action) => {
        state.error = { success: false, message: "", status: 0 };
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getSearchProductThunk.rejected, (state, action) => {
        state.error = action?.payload || {message:"Unknown error",success:false,status:404};
        state.products = defaultProductState;
        state.loading = false;
      })
      .addCase(getNavSearchProductThunk.fulfilled, (state, action) => {
        state.error = { success: false, message: "", status: 0 };
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getRelatedProduct.fulfilled, (state, action) => {
        state.error = { success: false, message: "", status: 0 };
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getCategoryProduct.fulfilled, (state, action) => {
        state.error = { success: false, message: "", status: 0 };
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getRecommendedProduct.fulfilled, (state, action) => {
        state.error = { success: false, message: "", status: 0 };
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getWeightsOfProduct.fulfilled, (state, action) => {
        state.error = { success: false, message: "", status: 0 };
        state.loading = false;
        state.weights = action.payload.data || [];
      })
   
  },
});

export default productSlice.reducer;
