import bcrypt from "bcrypt";
import { logger } from "../config/logger.js";
import { ApiError } from "./ApiError.js";

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    ApiError("Error hashing password:", { stack: error.stack });
    logger.error("Error hashing password:", error);
    throw new Error("Failed to hash password");
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    const isPasswordMatched = await bcrypt.compare(password, hashedPassword);
    return isPasswordMatched;
  } catch (error) {
    ApiError("Error comparing passwords:", { stack: error.stack });
    logger.error("Error comparing passwords:", error);
    throw new Error("Failed to compare passwords");
  }
};
