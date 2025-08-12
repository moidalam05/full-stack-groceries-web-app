import { Router } from "express";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import { registerSchema } from "../validators/auth.validator.js";
import { registerUser } from "../controllers/auth.controller.js";
const router = Router();

router
  .route("/register")
  .post(validateMiddleware(registerSchema), registerUser);
// router.route("/login").post();
// router.route("/logout").post();

export default router;
