import { model, Schema } from "mongoose";
import { User } from "../../../domain/user.entity.js";
import { fileSchema } from "./file.model.js";

const linkSchema = new Schema({
  id: { type: Number, required: true},
  name: { type: String, required: true, trim: true},
  url: { type: String, required: true, trim: true},
  enabled: { type: Boolean, default: false},
}, { _id: false });

const userSchema = new Schema({
  _id: { type: String, required: true, trim: true, unique: true},
  avatar: fileSchema,
  name: { type: String, required: true, trim: true},
  description: { type: String, trim: true},
  slug: { type: String, lowercase: true, trim: true, unique: true},
  links: { type: [linkSchema], default: [], cast: '{VALUE} is not a Link object' }
}, { autoIndex: false});

export default model<User>("User", userSchema);