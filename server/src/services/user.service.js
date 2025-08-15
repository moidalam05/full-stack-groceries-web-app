import { logger } from "../config/logger.js";

// Generate OTP Digits
export const generateOTP = (user) => {
  const now = Date.now();
  const coolDown = 60 * 1000;
  const maxResendCount = 5;

  if (user.lastOtpSentAt && now - user.lastOtpSentAt.getTime() < coolDown) {
    logger.error("Please wait before requesting another OTP.");
    throw new Error("Please wait before requesting another OTP.");
  }

  if (user.otpResendCount >= maxResendCount) {
    logger.error("You have reached the maximum number of OTP resend attempts.");
    throw new Error(
      "You have reached the maximum number of OTP resend attempts."
    );
  }

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  user.otpCode = otpCode;
  user.otpExpires = new Date(now + 10 * 60 * 1000);
  user.otpResendCount += 1;
  user.lastOtpSentAt = new Date(now);

  return otpCode;
};

// Verify OTP
export const verifyOTP = async (user, otp) => {
  if (user.otpCode !== otp) return false;
  if (user.now() > user.otpExpires) return false;

  user.otpCode = null;
  user.otpExpires = null;

  await user.save();
  return true;
};
