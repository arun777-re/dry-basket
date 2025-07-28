import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ItemProps } from "@/lib/type";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../services/middleware";
import { ErrorProps } from "@/types/response";
import { ROUTES } from "@/constants/routes";

interface productsType {
  loading: boolean;
  error: ErrorProps;
  products: ItemProps[];
  singleProduct: ItemProps | null;
}

const initialState: productsType = {
  loading: false,
  error: {
    success: false,
    message: "",
    status: 400,
  },
  products: [
    {
      _id: "",
      slug: "",
      productName: "",
      description: "",
      category: "",
      images: [],
      reviews: [
        {
          _id: "",
          rating: 0,
          reviewText: "",
          productId: "",
          user: {
            firstName: "",
          },
          createdAt: "",
        },
      ],
      variants: [
        {
          stock: 0,
          price: 0,
          discount: 0,
          discountExpiry: null,
          weight: 0,
        },
      ],
      status: "available",
      tags: [],
      isFeatured: false,
    },
  ],
  singleProduct: null,
};



// public routes
// get all products
export const getAllProduct = createAsyncThunk(
  "/public/get-product",
  async (_, { rejectWithValue }) => {
    const response = await getRequest({
      url: `${ROUTES.SERVER_BASE_URL}/v1/public/product/getall`,
      reject: rejectWithValue,
    });
    return response;
  }
);

// get single product
export const getSingleProduct = createAsyncThunk(
  "/public/get-single-product",
  async (slug: string, { rejectWithValue }) => {
    const response = await getRequest({
      url: `${ROUTES.SERVER_BASE_URL}/v1/public/product/getsingle/${slug}`,
      reject: rejectWithValue,
    });
    return response;
  }
);

// get all featured products
export const getFeaturedProduct = createAsyncThunk(
  "/public/get-featured-product",
  async (catname: string, { rejectWithValue }) => {
    const response = await getRequest({
      url: `${ROUTES.SERVER_BASE_URL}/v1/public/product/getfeatured/${catname}`,
      reject: rejectWithValue,
    });
    return response;
  }
);

// get search products
export const getSearchProduct = createAsyncThunk(
  "/public/get-search-product",
  async (_, { rejectWithValue }) => {
    const response = await getRequest({
      url: `${ROUTES.SERVER_BASE_URL}/v1/public/product/getsearch`,
      reject: rejectWithValue,
    });
    return response;
  }
);

// get related products
export const getRelatedProduct = createAsyncThunk(
  "/public/get-related-product",
  async (
    {
      category,
      productName,
      query = {},
    }: { category: string; productName: string; query?: Record<string, any> },
    { rejectWithValue }
  ) => {
    const response = await getRequest({
      url: `${ROUTES.SERVER_BASE_URL}/v1/public/product/getrelated`,
      reject: rejectWithValue,
      params: {
        category,
        productName,
        ...query,
      },
    });
    return response;
  }
);
// get recommended products
export const getRecommendedProduct = createAsyncThunk(
  "/public/get-recommended-product",
  async (
    {
      catId,
      query = {},
    }: { catId: string; query?: Record<string, any> },
    { rejectWithValue }
  ) => {
    const response = await getRequest({
      url: `${ROUTES.SERVER_BASE_URL}/v1/public/product/getrecommended`,
      reject: rejectWithValue,
      params: {
        catId,
        ...query,
      },
    });
    return response;
  }
);

// get product by category
export const getCategoryProduct = createAsyncThunk(
  "/public/get-category-product",
  async (catname: string, { rejectWithValue }) => {
    const response = await getRequest({
      url: `${ROUTES.SERVER_BASE_URL}/v1/public/product/getcatproduct/${catname}`,
      reject: rejectWithValue,
    });
    return response;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.error = { success: false, message: "", status: 0 };
        state.products = action.payload;
        state.loading = false;
      })
    
    
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
      .addCase(getSearchProduct.fulfilled, (state, action) => {
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
      });
  },
});

export default productSlice.reducer;
