import { v2 as cloudinary } from "cloudinary";
import { config } from "./config.js";

cloudinary.config({
  cloud_name: config.CloudinaryCloudName,
  api_key: config.CloudinaryApiKey,
  api_secret: config.CloudinaryApiSecret,
});

export { cloudinary };
