export interface User {
  _id: string;
  avatar: string | null;
  name: string;
  slug: string;
  description: string | null;
}

export type DataEditUser = Partial<Omit<User, "_id">>;