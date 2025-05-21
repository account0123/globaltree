import { model, Schema } from "mongoose";
import { User } from "../../../domain/user.entity.js";
import { fileSchema } from "./file.model.js";

const userSchema = new Schema({
  _id: { type: String, required: true, trim: true, unique: true},
  avatar: fileSchema,
  name: { type: String, required: true, trim: true},
  description: { type: String, trim: true},
  slug: { type: String, lowercase: true, trim: true, unique: true},
}, { autoIndex: false});

export default model<User>("User", userSchema);