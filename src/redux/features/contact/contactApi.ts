import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../types/tagTypes";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNewContact: builder.mutation({
      query: (contactData) => ({
        url: "/contact/create-contact",
        method: "POST",
        body: contactData,
      }),
      invalidatesTags: [tagTypes.contact],
    }),
    getMyContact: builder.query({
      query: () => ({
        url: "/contact/get-my-contact",
        method: "GET",
      }),
      providesTags: [tagTypes.contact],
    }),
  }),
});

export const { useCreateNewContactMutation, useGetMyContactQuery } = contactApi;
