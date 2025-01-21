export enum tagTypes {
  admin = "admin",
  member = "member",
  message = "message",
  contact = "contact",
}

export type TagTypes = (typeof tagTypes)[keyof typeof tagTypes];

// export type TagType = keyof typeof tagTypes;

export const tagTypesList = [
  tagTypes.member,
  tagTypes.admin,
  tagTypes.message,
  tagTypes.contact,
];
