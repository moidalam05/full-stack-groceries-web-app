import morgan from "morgan";
import { logger } from "../config/logger.js";
import { config } from "../config/config.js";

// Custom morgan stream to pipe HTTP logs to winston
const stream = {
  write: (message) => logger.http(message.trim()),
};

const skip = () => {
  return config.env !== "development";
};

// Morgan middleware for logging formats
export const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream, skip }
);
