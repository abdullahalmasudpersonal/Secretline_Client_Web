export type TChatUserLastMessage = {
  _id: string;
  content: string;
  senderId: string;
  timestamp: string;
};
export type TChatUser = {
  chatId: string;
  userId: string;
  email: string;
  name: string;
  phone: string;
  lastMessage: TChatUserLastMessage;
  updatedAt: string;
};

export type TChat = {
  _id: string;
  chatId: string;
  content: string;
  messageType: string;
  senderId: string;
  timestamp: string;
};
