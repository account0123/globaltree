import { Request } from "express";
import { File } from "../domain/file.entity.js";

export interface FileStoragePort {
    uploadOne(req: Request, tag: string): Promise<File>;
    deleteOne(tag: string, fileId: string): Promise<void>;
    download(tag: string, fileId: string): Promise<Buffer>;
}