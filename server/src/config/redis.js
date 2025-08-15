import Redis from "ioredis";
import { config } from "./config.js";
import { logger } from "./logger.js";
import chalk from "chalk";

export const redisClient = new Redis(config.redisUri);

redisClient.on("error", (error) => {
  logger.error(chalk.red(`❌ Redis connection failed: ${error.message}`));
});

redisClient.on("connect", () => {
  logger.info(chalk.green.bold("✅ Redis connected successfully"));
});
