import fs from "fs";
import { cloudinary } from "../config/cloudinary.js";

export const uploadFileToCloudinary = async (
  localFilePath,
  folder = "uploads"
) => {
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: folder,
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath);
    return {
      ...result,
      publicId: result.public_id,
      url: result.secure_url,
    };
  } catch (error) {
    fs.unlinkSync(localFilePath);
    throw error;
  }
};

export const deleteFileFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    throw new Error(`Failed to delete file from Cloudinary: ${error.message}`);
  }
};
