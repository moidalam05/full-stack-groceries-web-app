import { config } from "../config/config.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// Generate Access Token
export const generateAccessToken = (user) => {
  return jwt.sign(user, config.jwtAccessSecret, {
    expiresIn: config.jwtAccessExpiresIn,
  });
};

// Generate Refresh Token
export const generateRefreshToken = (user) => {
  return jwt.sign(user, config.jwtRefreshSecret, {
    expiresIn: config.jwtRefreshExpiresIn,
  });
};

// Reset Password Token
export const generateResetPasswordToken = () => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const expiresAt = Date.now() + 10 * 60 * 1000;
  return { resetToken, hashedToken, expiresAt };
};
