import { File } from "../../../domain/file.entity.js";
import FileModel from "./file.model.js";

export default class {

  static async save(data: File) {
    return FileModel.create(data);
  }

  static async findById(id: string) {
    return FileModel.findOne({ _id: id });
  }
}