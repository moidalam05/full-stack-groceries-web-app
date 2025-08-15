import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { sendEmail } from "../services/email.service.js";
import { otpEmailTemplate } from "../templates/emails/otpSendTemplate.js";

// @desc Register a new user
// @route POST /api/v1/auth/register
// @access Public
export const registerUser = asyncHandler(async (req, res) => {});

// @desc Verify OTP and complete registration
// @route POST /api/v1/auth/verify-otp
// @access Public
export const verifyOtp = asyncHandler(async (req, res) => {});
