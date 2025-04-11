import { configureStore } from "@reduxjs/toolkit";
import userReducer from './UserSlice'
import { ProductApi } from "./ProductApi";
import { AuthApi } from "./AuthApi";
import cartReducer from './cartSlice'
import { OrderApi } from "./OrderApi";


export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    cartData: cartReducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [OrderApi.reducer]: OrderApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    ProductApi.middleware,
    AuthApi.middleware,
    OrderApi.middleware
  ])

})  