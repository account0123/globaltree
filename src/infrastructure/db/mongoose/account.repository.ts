import { Account } from "../../../domain/account.entity.js";
import AccountModel from "./account.model.js";

export default class {
  static async save(data: Account) {
    return AccountModel.create(data);
  }

  static async findByEmail(email: string) {
    return AccountModel.findOne({ email });
  }

  static async findBySlug(slug: string) {
    return AccountModel.findOne({ slug });
  }
}