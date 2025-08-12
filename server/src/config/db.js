import { config } from "./config.js";
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import chalk from "chalk";
import { logger } from "./logger.js";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${config.mongoURI}/${DB_NAME}`
    );
    logger.info(
      chalk.green.bold(
        `✅ MongoDB connected successfully at ${connectionInstance.connection.host}/${DB_NAME}`
      )
    );
  } catch (error) {
    logger.error(chalk.red(`❌ MongoDB Connection Failed || ${error}`));
    process.exit(1);
  }
};
