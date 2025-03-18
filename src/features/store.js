import { configureStore } from "@reduxjs/toolkit";
import userReducer from './UserSlice'
import { ProductApi } from "./ProductApi";


export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    [ProductApi.reducerPath]: ProductApi.reducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    ProductApi.middleware
  ])

})  