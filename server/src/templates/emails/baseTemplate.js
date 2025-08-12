import { config } from "../../config/config.js";

export const baseTemplate = (title, content) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>${title} - ${config.appName}</title>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; }
      .container { max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; }
      h2 { color: #333; }
      p { font-size: 14px; color: #555; }
      .footer { font-size: 12px; color: #999; margin-top: 20px; }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>${title}</h2>
      ${content}
      <div class="footer">This is an automated message from ${config.appName}. Please do not reply.</div>
    </div>
  </body>
  </html>
`;
