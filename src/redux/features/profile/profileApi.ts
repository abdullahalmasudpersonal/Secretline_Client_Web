import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../types/tagTypes";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: [tagTypes.profile]
    }),
    updateProfile: builder.mutation({
      query: (FormData) => ({
        url: "/user/update-my-profile",
        method: "PATCH",
        body: FormData
      }),
      invalidatesTags: [tagTypes.profile]
    })
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
