import { File } from "./file.entity.js";

export interface User {
  _id: string;
  avatar: File | null;
  name: string;
  slug: string;
  description: string | null;
}

export type DataEditUser = Partial<Omit<User, "_id" | "avatar">>;