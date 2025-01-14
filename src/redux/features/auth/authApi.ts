import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../types/tagTypes";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: [tagTypes.member],
    }),
    registrationBuyer: builder.mutation({
      query: (userInfo) => ({
        url: "/user/create-buyer",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: [tagTypes.member],
    }),
  }),
});

export const { useLoginMutation, useRegistrationBuyerMutation } = authApi;
