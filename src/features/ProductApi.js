import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "./constant";


export const ProductApi = createApi({
  reducerPath: 'ProductApi',
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
  tagTypes: ["product"],
  endpoints: (builder) => ({

    getProduct: builder.query({
      query: () => '/product/fetch-products',
      providesTags: ["product"]
    })
  })

})

export const { useGetProductQuery } = ProductApi