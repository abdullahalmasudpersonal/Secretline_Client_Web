import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../types/tagTypes";

const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createChattingRoom: builder.mutation({
      query: (data) => ({
        url: "/chat/create-chat",
        method: "POST",
        body: data
      }),
      invalidatesTags: [tagTypes.chat],
    }),
    getSingleMemberAllUserChat: builder.query({
      query: () => ({
        url: "/message/get-all-user-chat-single-member",
        method: "GET",
      }),
      providesTags: [tagTypes.message, tagTypes.chat],
    }),
    getSingleMemberSingleUserChat: builder.query({
      query: (chatId) => ({
        url: `/message/get-single-user-chat-single-member/${chatId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.message, tagTypes.chat],
    }),
  }),
});

export const {
  useCreateChattingRoomMutation,
  useGetSingleMemberAllUserChatQuery,
  useGetSingleMemberSingleUserChatQuery,
} = chatApi;
