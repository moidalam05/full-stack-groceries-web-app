import { createClient } from "redis";
import { logger } from "../config/logger.js";
import { config } from "../config/config.js";
import chalk from "chalk";

export const redisClient = createClient({
  url: config.redisUrl,
});

redisClient.on("error", (err) => {
  logger.error(chalk.red("Redis Client Error", err));
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    logger.info(chalk.green.bold("✅ Redis connected successfully"));
  } catch (error) {
    logger.error(chalk.red("Failed to connect to Redis:", error));
    throw error;
  }
};
