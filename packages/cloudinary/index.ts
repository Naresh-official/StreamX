import { v2 as cloudinary } from "cloudinary";
import { env } from "@workspace/config/server";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(buffer: Buffer): Promise<string> {
  try {
    const base64 = buffer.toString("base64");
    const dataUri = `data:image/jpeg;base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      resource_type: "image",
      folder: "streamx",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export async function deleteImage(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
}
