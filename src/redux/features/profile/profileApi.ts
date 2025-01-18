import { baseApi } from "../../api/baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
