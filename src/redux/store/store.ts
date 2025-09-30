// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import {storage} from '@/lib/storage';
import { rootReducer, RootReducerType } from './rootReducer';
import logger from 'redux-logger';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'product', 'category', 'offer', 'usercart', 'review', 'shipping', 'order'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) =>
    gDM({ serializableCheck: false, immutableCheck: false }).concat(logger),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
// ✅ use the type from the unpersisted reducer, not from store.getState
export type RootState = RootReducerType;
