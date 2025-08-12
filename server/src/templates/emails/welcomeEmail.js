import { baseTemplate } from "./baseTemplate.js";

export const welcomeEmail = (username) => {
  const content = `
    <p>Hi <strong>${username}</strong>,</p>
    <p>Welcome to our Grocery Store! We’re excited to have you on board. Start shopping and enjoy our services.</p>
  `;
  return baseTemplate("Welcome to Grocery Store", content);
};
