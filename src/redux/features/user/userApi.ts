import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
    getSingleUser: builder.query({
      query: (userId) => ({
        url: `/user/singleuser/${userId}`,
        method: "GET"
      })
    })
  }),
});

export const { useGetAllUserQuery, useGetSingleUserQuery } = userApi;
