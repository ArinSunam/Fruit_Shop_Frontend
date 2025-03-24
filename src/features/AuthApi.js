import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BaseUrl } from "./constant"


export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
  endpoints: (builder) => ({

    //Register

    register: builder.mutation({
      query: (data) => ({
        url: `/auth/register/`,
        body: data,
        method: 'POST'

      })
    }),

    //login
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login/',
        body: data,
        method: 'POST'
      })
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout/',
        method: 'POST'
      })
    })


  })
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = AuthApi;