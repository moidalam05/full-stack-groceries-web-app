import { baseTemplate } from "./baseTemplate.js";

export const otpEmailTemplate = (otpCode) => {
  const content = `
    <p>Hi,</p>
    <p>Thank you for registering! Please use the following One-Time Password (OTP) to verify your email address. This OTP is valid for <strong>5 minutes</strong>.</p>
    <h2 style="letter-spacing: 6px; color: #2a2a72;">${otpCode}</h2>
    <p>If you did not request this, please ignore this email.</p>
  `;
  return baseTemplate("Email Verification", content);
};
