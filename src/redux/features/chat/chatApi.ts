import { baseApi } from "../../api/baseApi";

const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleMemberAllUserChat: builder.query({
      query: () => ({
        url: "/message/get-all-user-chat-single-member",
        method: "GET",
      }),
    }),
    getSingleMemberSingleUserChat: builder.query({
      query: (chatId) => ({
        url: `/message/get-single-user-chat-single-member/${chatId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetSingleMemberAllUserChatQuery,
  useGetSingleMemberSingleUserChatQuery,
} = chatApi;
