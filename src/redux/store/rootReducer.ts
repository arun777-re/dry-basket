// reducers.ts
import { combineReducers } from '@reduxjs/toolkit';

import productReducer from '@/redux/slices/productSlice';
import categoryReducer from '@/redux/slices/categorySlice';
import cartReducer from '@/redux/slices/cartSlice';
import userReducer from "@/redux/slices/userSlice";
import reviewReducer from '@/redux/slices/reviewSlice'
import shippingReducer from '@/redux/slices/shippingSlice';
import orderReducer from '@/redux/slices/orderSlice';
import blogReducer from '@/redux/slices/blogSlice';
import bannerReducer from '@/redux/slices/bannerSlice';
import interactionReducer from '@/redux/slices/interactionSlice';
import wishReducer from '@/redux/slices/wishSlice';

export const rootReducer = combineReducers({
  product: productReducer,
  category: categoryReducer,
  usercart: cartReducer,
  user: userReducer,
  review: reviewReducer,
  shipping: shippingReducer,
  order: orderReducer,
  blog: blogReducer,
  banner: bannerReducer,
  interaction:interactionReducer,
  wishlist:wishReducer,
});

export type RootReducerType = ReturnType<typeof rootReducer>;
