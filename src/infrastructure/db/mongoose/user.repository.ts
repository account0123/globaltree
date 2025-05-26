import { DataEditUser, User } from "../../../domain/user.entity.js";
import UserModel from "./user.model.js";

export default class {

  static async update(id: string, data: DataEditUser) {
    return UserModel.findByIdAndUpdate(id, data, { returnDocument: "after", runValidators: true });
  }
  
  static async save(data: User) {
    return UserModel.create(data);
  }

  static async findById(id: string) {
    return UserModel.findOne({ _id: id }).select("-__v");
  }

  static async findBySlug(slug: string) {
    return UserModel.findOne({ slug }).select("-__v");
  }
}