import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemProps } from "@/lib/type";

interface productsType {
  loading: boolean;
  error: { message: string } | null;
  products: ItemProps[];
}

const initialState: productsType = {
  loading: false,
  error: null,
  products: [
    {
      _id: "",
      slug: "",
      productName: "",
      description: "",
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

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    createStart:(state)=>{
  state.loading = true;
  state.error = null;
    },
    createSuccess:(state,action:PayloadAction<any>)=>{
      state.loading = false;
        state.products.push(action.payload);
    },

    createFailure:(state,action:PayloadAction<any>)=>{
      state.loading = false;
        state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    // .addCase()
  },
});

export const {createStart,createFailure,createSuccess} = productSlice.actions;

export default productSlice.reducer;
