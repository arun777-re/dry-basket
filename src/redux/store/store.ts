'use client'
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistStore, persistReducer,Persistor } from "redux-persist";
import storage from "@/lib/storage";
import productReducer from '@/redux/slices/productSlice';
import categoryReducer from '@/redux/slices/categorySlice';
import offerReducer from '@/redux/slices/offerSlice';
import cartReducer from '@/redux/slices/cartSlice';
import userReducer from "@/redux/slices/userSlice"
// configuration for the persisted reducer
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "product", "category",'offer','usercart'],
};

// object of the root reducer
const rootReducer = {
product:productReducer,
category:categoryReducer,
offer:offerReducer,
usercart:cartReducer,
user:userReducer,
};

// make the persisted reducers
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer)
);

// making store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(logger);
  },
});

let persistor:Persistor;
if (typeof window !== "undefined") {
  persistor = persistStore(store);
}
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export { persistor, store };
