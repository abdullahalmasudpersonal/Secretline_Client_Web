import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../types/tagTypes";

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMessage: builder.mutation({
      query: (newMessage) => ({
        url: "/message/send-message",
        method: "POST",
        body: newMessage,
      }),
      invalidatesTags: [tagTypes.message],
    }),
  }),
});

export const { useCreateMessageMutation } = messageApi;
