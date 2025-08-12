import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

export const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 8000,

  // Database configuration
  mongoURI: process.env.MONGODB_URI,

  // JWT configuration
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "1h",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",

  // S3 configuration
  s3BucketName: process.env.AWS_S3_BUCKET_NAME,
  s3Region: process.env.AWS_S3_REGION,
  s3AccessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  s3SecretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,

  // Cloudinary configuration
  CloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  CloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  CloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,

  // Email configuration
  emailHost: process.env.EMAIL_HOST,
  emailPort: process.env.EMAIL_PORT,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASSWORD,
  appName: process.env.APP_NAME,

  // Logging configuration
  logLevel: process.env.LOG_LEVEL || "info",
};
