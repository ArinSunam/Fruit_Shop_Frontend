import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "./constant";

export const OrderApi = createApi({
  reducerPath: 'OrderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,

  }),
  tagTypes: ["order"],
  endpoints: (builder) => ({

    addOrder: builder.mutation({
      query: (query) => ({
        url: '/order',
        method: 'POST',
        body: query.data,
        headers: {
          Authorization: `Bearer ${query.token}`,
        },
      }),
    }),

  })
});

export const { useAddOrderMutation } = OrderApi;
