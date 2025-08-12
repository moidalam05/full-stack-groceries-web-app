import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is Required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must not exceed 50 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is Required",
    "string.email": "Email is Invalid",
  }),
  password: Joi.string().min(6).max(100).required().messages({
    "string.empty": "Password is Required",
    "string.min": "Password must be at least 6 characters long",
    "string.max": "Password must not exceed 100 characters",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is Required",
    "string.email": "Email is Invalid",
  }),
  password: Joi.string().min(6).max(100).required().messages({
    "string.empty": "Password is Required",
    "string.min": "Password must be at least 6 characters long",
    "string.max": "Password must not exceed 100 characters",
  }),
});
