import { config } from "../config/config.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { randomUUID } from "crypto";
import { logger } from "../config/logger.js";

export const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorId = err.errorId || randomUUID();

  // winston logger
  logger.error({
    message: err.message,
    statusCode,
    errors: err.errors || [],
    stack: err.stack,
    errorId,
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  if (err instanceof ApiError) {
    return res
      .status(statusCode)
      .json(
        new ApiResponse(
          statusCode,
          null,
          `${err.message} (Error ID: ${errorId})`,
          config.env === "development" ? err.errors : []
        )
      );
  }

  // Handle unknown errors
  return res
    .status(500)
    .json(
      new ApiResponse(
        500,
        null,
        `Internal Server Error (Error ID: ${errorId})`,
        config.env === "development" ? [err.stack] : []
      )
    );
};
