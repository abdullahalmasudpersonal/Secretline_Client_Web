export enum tagTypes {
  admin = "admin",
  member = "member",
  message = "message",
  contact = "contact",
  profile = "profile",
  chat = "chat"
}

export type TagTypes = (typeof tagTypes)[keyof typeof tagTypes];

// export type TagType = keyof typeof tagTypes;

export const tagTypesList = [
  tagTypes.member,
  tagTypes.admin,
  tagTypes.message,
  tagTypes.contact,
  tagTypes.profile,
  tagTypes.chat
];
