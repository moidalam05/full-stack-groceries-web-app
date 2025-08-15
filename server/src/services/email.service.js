import { config } from "../config/config.js";
import { logger } from "../config/logger.js";
import { transporter } from "../config/nodemailer.js";

export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"${config.appName}" <${config.emailUser}>`,
      to,
      subject,
      html,
    });
    logger.info(`✅ Email sent to ${to}: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error("❌ Failed to send email:", error);
    throw error;
  }
};
