// reducers.ts
import { combineReducers } from '@reduxjs/toolkit';

import productReducer from '@/redux/slices/productSlice';
import categoryReducer from '@/redux/slices/categorySlice';
import offerReducer from '@/redux/slices/offerSlice';
import cartReducer from '@/redux/slices/cartSlice';
import userReducer from "@/redux/slices/userSlice";
import reviewReducer from '@/redux/slices/reviewSlice'
import shippingReducer from '@/redux/slices/shippingSlice';
import orderReducer from '@/redux/slices/orderSlice';
import blogReducer from '@/redux/slices/blogSlice';
import bannerReducer from '@/redux/slices/bannerSlice';

export const rootReducer = combineReducers({
  product: productReducer,
  category: categoryReducer,
  offer: offerReducer,
  usercart: cartReducer,
  user: userReducer,
  review: reviewReducer,
  shipping: shippingReducer,
  order: orderReducer,
  blog: blogReducer,
  banner: bannerReducer,
});

export type RootReducerType = ReturnType<typeof rootReducer>;
