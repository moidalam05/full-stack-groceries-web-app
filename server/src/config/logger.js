import { config } from "./config.js";
import winston from "winston";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create a logger instance
export const logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.combine(
    winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    logFormat
  ),

  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
        logFormat
      ),
    }),

    // Save logs to a file
    new winston.transports.File({
      filename: path.join(__dirname, "../../logs/app.log"),
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../../logs/error.log"),
      level: "error",
    }),
  ],
});
