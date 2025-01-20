import { baseApi } from "../../api/baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyContact: builder.query({
      query: () => ({
        url: "/contact/get-my-contact",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMyContactQuery } = contactApi;
