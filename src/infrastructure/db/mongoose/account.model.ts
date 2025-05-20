import { model, Schema } from "mongoose";
import { Account } from "../../../domain/account.entity.js";

const accountSchema = new Schema({
  email: { type: String, required: true, trim: true, unique: true, lowercase: true },
  name: { type: String, required: true, trim: true},
  password: { type: String, required: true, trim: true},
  user_id: { type: String, required: true, trim: true, uppercase: true, ref: "User" },
  created_at: { type: Date, default: Date.now },
});

export default model<Account>("Account", accountSchema);