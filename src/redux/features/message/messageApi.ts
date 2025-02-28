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
    createVoiceMessage: builder.mutation({
      query: (newVoiceMessage) => ({
        url: "/message/send-voice-message",
        method: "POST",
        body: newVoiceMessage,
      }),
    }),
  }),
});

export const { useCreateMessageMutation, useCreateVoiceMessageMutation } =
  messageApi;
