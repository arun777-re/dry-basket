import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistStore, persistReducer,Persistor } from "redux-persist";
import storage from "@/lib/storage";
import {apiMiddleware} from '@/redux/services/middleware'

// configuration for the persisted reducer
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "admin", "product", "card"],
};

// object of the root reducer
const rootReducer = {

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
    }).concat(apiMiddleware,logger);
  },
});

let persistor:Persistor;
if (typeof window !== "undefined") {
  persistor = persistStore(store);
}
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export { persistor, store };
