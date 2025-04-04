import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "./constant";

export const ProductApi = createApi({
  reducerPath: 'ProductApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,

  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ page, limit }) => `product/fetch-products?page=${page}&perPage=${limit}`,

      providesTags: ["product"]
    }),

    getProductDetail: builder.query({
      query: (id) => `/product/fetch-product/${id}`,
      providesTags: ["product"]
    }),

    addProduct: builder.mutation({
      query: (query) => (
        {

          url: '/product/add-product/',
          body: query.data,
          headers: {
            Authorization: `Bearer ${query.token}`,
          },

          method: 'POST',
          invalidatesTags: ["product"]

        })
    })
  })
});

export const { useGetProductQuery, useGetProductDetailQuery, useAddProductMutation } = ProductApi;
