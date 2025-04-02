import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "./constant";

export const ProductApi = createApi({
  reducerPath: 'ProductApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    credentials: "include" // ✅ Add this to allow cookies to be sent with requests
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => '/product/fetch-products',
      providesTags: ["product"]
    }),

    getProductDetail: builder.query({
      query: (id) => `/product/fetch-product/${id}`,
      providesTags: ["product"]
    }),

    addProduct: builder.mutation({
      query: (data) => ({
        url: '/product/add-product',
        body: data,
        method: 'POST',
        credentials: "include" // ✅ Ensure credentials are sent in mutation
      })
    })
  })
});

export const { useGetProductQuery, useGetProductDetailQuery, useAddProductMutation } = ProductApi;
