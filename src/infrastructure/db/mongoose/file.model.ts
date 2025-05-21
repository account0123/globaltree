import { model, Schema } from "mongoose";
import { File } from "../../../domain/file.entity.js";

export const fileSchema = new Schema({
    _id: { type: String, required: true, trim: true, unique: true},
    tag: { type: String, required: true, trim: true},
    url: { type: String, required: true, trim: true},
    metadata: { type: Object, required: true, trim: true},
}, { autoIndex: false});

export default model<File>("File", fileSchema);