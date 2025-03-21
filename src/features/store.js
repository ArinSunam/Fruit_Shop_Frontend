import { configureStore } from "@reduxjs/toolkit";
import userReducer from './UserSlice'
import { ProductApi } from "./ProductApi";
import { AuthApi } from "./AuthApi";


export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    ProductApi.middleware,
    AuthApi.middleware
  ])

})  