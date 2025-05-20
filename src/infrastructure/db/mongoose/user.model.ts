import { model, Schema } from "mongoose";
import { User } from "../../../domain/user.entity.js";

const userSchema = new Schema({
  _id: { type: String, required: true, trim: true, unique: true},
  name: { type: String, required: true, trim: true},
  slug: { type: String, lowercase: true, trim: true, unique: true},
}, { autoIndex: false});

export default model<User>("User", userSchema);