import { User } from "../../../domain/user.entity.js";
import UserModel from "./user.model.js";

export default class {
  static async save(data: User) {
    return UserModel.create(data);
  }

  static async findById(id: string) {
    return UserModel.findOne({ _id: id });
  }

  static async findBySlug(slug: string) {
    return UserModel.findOne({ slug });
  }
}