import formidable from "formidable";
import { Request } from "express";
import { v2 as cloudinary } from "cloudinary";
import { FileStoragePort } from "../../ports/file_storage.port.js";
import { UlidService } from "./ulid.service.js";
import { FileDTO } from "../../domain/file.entity.js";
import FileRepository from "../db/mongoose/file.repository.js";

const { CLOUDINARY_CLOUD, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

if (!CLOUDINARY_CLOUD) {
    throw new TypeError("CLODINARY_CLOUD is not defined in environment");
}
if (!CLOUDINARY_API_KEY) {
    throw new TypeError("CLOUDINARY_API_KEY is not defined in environment");
}
if (!CLOUDINARY_API_SECRET) {
    throw new TypeError("CLOUDINARY_API_SECRET is not defined in environment");
}

cloudinary.config({ 
    cloud_name: CLOUDINARY_CLOUD, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET
});

export class CloudinaryService implements FileStoragePort {
    deleteOne(tag: string, fileId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    download(tag: string, fileId: string): Promise<Buffer> {
        throw new Error("Method not implemented.");
    }
    async uploadOne(req: Request, tag: string) {
        if (!tag) {
            throw new TypeError("Expected tag");
        }
        const form = formidable({ multiples: false, maxFileSize: 4_000_000 });
        const [_, files] = await form.parse(req);
        const file = files.file?.[0];
        if (!file) {
            throw new TypeError("Expected file");
        }
        const result = await cloudinary.uploader.upload(file.filepath, {
            public_id: UlidService.generate(),
            folder: tag,
        });
        return FileRepository.save({
            _id: result.public_id,
            tag,
            url: result.secure_url,
            metadata: {
                type: "Image",
                width: result.width,
                height: result.height,
            },
        });
    }
}

export const CDNService = new CloudinaryService();