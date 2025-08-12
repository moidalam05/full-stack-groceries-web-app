import { config } from "./config/config.js";
import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import chalk from "chalk";
import { logger } from "./config/logger.js";

connectDB()
  .then(() => {
    app.listen(config.port, () => {
      logger.info(
        chalk.green.bold(
          `🚀 Server is running on http://localhost:${config.port} [${config.env}]`
        )
      );
    });
  })
  .catch((error) => {
    logger.error(chalk.red("Database connection failed:", error));
    process.exit(1);
  });
