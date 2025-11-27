import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ErrorProps,
  IncomingAPIResponseFormat,
  PaginatedProductResponse,
  PaginationQuery,
} from "@/types/response";
import { BlogsIncomingDTO, BlogState } from "@/types/blog";
import { BLOGAPISFETCH } from "../services/api/blog";
import { defaultError } from "../services/helpers/userresponse";
import {
  defaultPaginatedBlogResponse,
  defaultSingleBlogResponse,
} from "../services/helpers/blogResponse";

const initialState: BlogState = {
  loading: false,
  error: defaultError,
  blogs: defaultPaginatedBlogResponse,
  singleBlog: defaultSingleBlogResponse,
  message: "",
};

export const getSingleBlogThunk = createAsyncThunk<
  IncomingAPIResponseFormat<BlogsIncomingDTO>,
  string,
  { rejectValue: ErrorProps }
>("/blog-getsingle", async (slug, { rejectWithValue }) => {
  const res = await BLOGAPISFETCH.getBlogOperation({
    slug,
    reject: rejectWithValue,
  });
  return res;
});
export const getAllBlogThunk = createAsyncThunk<
  PaginatedProductResponse<BlogsIncomingDTO>,
  PaginationQuery,
  { rejectValue: ErrorProps }
>("/blog-getall", async (query, { rejectWithValue }) => {
  const res = await BLOGAPISFETCH.getAllBlogOperation({
    reject: rejectWithValue,
    query,
  });
  return res;
});
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleBlogThunk.fulfilled, (state, action) => {
      state.error = defaultError;
      state.loading = false;
      state.singleBlog = action.payload;
    });
    builder.addCase(getAllBlogThunk.fulfilled, (state, action) => {
      state.error = defaultError;
      state.loading = false;
      state.blogs = action.payload;
    });
  },
});

export default blogSlice.reducer;
