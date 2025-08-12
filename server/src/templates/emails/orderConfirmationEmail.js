import { baseTemplate } from "./baseTemplate.js";

export const orderConfirmationEmail = (orderId, totalAmount) => {
  const content = `
    <p>Your order <strong>#${orderId}</strong> has been confirmed!</p>
    <p>Total Amount: ₹${totalAmount}</p>
    <p>Thank you for shopping with us!</p>
  `;
  return baseTemplate("Order Confirmation", content);
};
