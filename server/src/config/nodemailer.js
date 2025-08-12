import nodemailer from "nodemailer";
import { config } from "./config.js";
import { logger } from "./logger.js";
import chalk from "chalk";

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
    logger.error(
      chalk.red(`❌ Email server connection failed: ${error.message}`)
    );
  } else {
    logger.info(chalk.green.bold("✅ Email server is ready to send messages"));
  }
});
