export type TContactList = {
  userId: string;
  name: string;
  email: string;
  phone: string;
  about: string;
  profileImg: string;
};
export type TContact = {
  _id: string;
  userId: string;
  contacts: TContactList[];
};
