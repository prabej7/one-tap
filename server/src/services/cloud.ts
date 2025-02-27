import { UploadApiErrorResponse } from "cloudinary";
import cloud from "../configs/cloud";
import path from "path";
import { generate } from 'randomstring'
import cloudinary from "../configs/cloud";

export const uploadFile = async (file: Express.Multer.File) => {

    return new Promise((resolve, reject) => {

        const uploadResult = cloud.uploader.upload_stream(
            {
                public_id: path.parse(generate(6) + file.originalname).name,
            },
            async (err: UploadApiErrorResponse | undefined, result: any) => {
                
                if (err) {
                    return 1;
                }

                const optimizedUrl = cloud.url(result.public_id, {
                    fetch_format: "auto",
                    quality: "auto",
                });

                if (optimizedUrl) {
                    resolve(optimizedUrl);
                }
            }
        );
        uploadResult.end(file.buffer);
    });
};

const extractPublicId = (url: string): string => {
    const parts = url.split("/");
    const lastPart = parts.pop();
    if (!lastPart) {
        throw new Error("Invalid URL format");
    }
    const publicIdWithVersion = lastPart.split(".")[0].split("?")[0];
    return publicIdWithVersion;
};

export const deleteFile = async (url: string | string[]): Promise<number> => {
    if (Array.isArray(url)) {
        const publicIds = url.map(extractPublicId);
        try {
            await new Promise((resolve, reject) => {
                cloudinary.api.delete_resources(publicIds, (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(true);
                    }
                });
            });
        } catch (error) {
            console.error("Error deleting files:", error);
            throw error;
        }
    } else {
        const publicId = extractPublicId(url);
        try {
            await new Promise((resolve, reject) => {
                cloudinary.uploader.destroy(publicId, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
        } catch (error) {
            console.error("Error deleting file:", error);
            throw error;
        }
    }
    return 1;
};

