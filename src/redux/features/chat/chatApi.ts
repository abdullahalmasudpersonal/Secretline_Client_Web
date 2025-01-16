import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../types/tagTypes";

const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleMemberAllUserChat: builder.query({
      query: () => ({
        url: "/message/get-all-user-chat-single-member",
        method: "GET",
      }),
      providesTags: [tagTypes.message],
    }),
    getSingleMemberSingleUserChat: builder.query({
      query: (chatId) => ({
        url: `/message/get-single-user-chat-single-member/${chatId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.message],
    }),
  }),
});

export const {
  useGetSingleMemberAllUserChatQuery,
  useGetSingleMemberSingleUserChatQuery,
} = chatApi;
