import express from "express";
import { config } from "./config/config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { morganMiddleware } from "./middlewares/morganMiddleware.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

export const app = express();

// 📝 Logging middleware at the top
app.use(morganMiddleware);
app.use(helmet());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: config.env === "development",
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message:
      "Too many requests from this IP, please try again after 15 minutes",
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// 📝 Importing routes
import authRoutes from "./routes/auth.route.js";

// 📝 Using routes
app.use("/api/v1/auth", authRoutes);

// ❌ Error middleware always at the end
app.use(errorMiddleware);
