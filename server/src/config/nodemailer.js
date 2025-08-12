import nodemailer from "nodemailer";
import { config } from "./config.js";
import { logger } from "./logger.js";

// Transport configuration
export const transporter = nodemailer.createTransport({
  host: config.emailHost,
  port: config.emailPort,
  secure: config.emailPort === 465,
  auth: {
    user: config.emailUser,
    pass: config.emailPass,
  },
  connectionTimeout: 10000,
});

// verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    logger.error("❌ Email server connection failed:", error);
  } else {
    logger.info("✅ Email server is ready to send messages");
  }
});
