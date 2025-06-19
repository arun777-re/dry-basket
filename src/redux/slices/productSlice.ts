import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemProps } from "@/lib/type";
import { getRequest, postRequest } from "../services/middleware";
import { ErrorProps } from "@/types/response";




interface productsType {
  loading: boolean;
  error:ErrorProps;
  products: ItemProps[];
}

const initialState: productsType = {
  loading: false,
  error:{
    success:false,
    message:'',
    status:400
  },
  products: [
    {
      _id: "",
      slug: "",
      productName: "",
      description: "",
      category:"",
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
};

// createproduct thunk
export const createProduct = createAsyncThunk('/admin/create-product',async(data:FormData,{rejectWithValue})=>{
const response = await postRequest({url:'/api/admin/create-product',reject:rejectWithValue,data:data});
return response;
});

export const getProduct = createAsyncThunk('/public/get-product',async(_,{rejectWithValue})=>{
  const response = await getRequest({url:`/api/public/get-product?limit=10&page=1`,reject:rejectWithValue});
  return response;
})

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(createProduct.fulfilled,(state,action)=>{
      state.error = { success:false,message:'',status:0};
    state.products = action.payload;
    state.loading = false;
  })
    .addCase(getProduct.fulfilled,(state,action)=>{
      state.error = { success:false,message:'',status:0};
    state.products = action.payload;
    state.loading = false;
  })
  
  }
  },
);


export default productSlice.reducer;
