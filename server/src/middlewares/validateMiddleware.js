import { ApiError } from "../utils/ApiError.js";

export const validateMiddleware = (schema, property = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((err) => err.message);
      return next(new ApiError("Validation Error", 400, errorMessages));
    }
    next();
  };
};
