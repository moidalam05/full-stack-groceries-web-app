import { baseTemplate } from "./baseTemplate.js";

export const resetPasswordEmail = (resetLink) => {
  const content = `
    <p>You requested to reset your password.</p>
    <p>Click the link below to reset it:</p>
    <a href="${resetLink}" style="display:inline-block;padding:10px 15px;background:#28a745;color:white;text-decoration:none;border-radius:5px;">Reset Password</a>
  `;
  return baseTemplate("Password Reset Request", content);
};
