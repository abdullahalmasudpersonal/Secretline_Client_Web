export type TContactList = {
  name: string;
  email: string;
  phone: string;
  about: string;
};
export type TContact = {
  _id: string;
  userId: string;
  contacts: TContactList[];
};
