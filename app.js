import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import morgan from "morgan";
import cookieParser from "cookie-parser";

import { globalLimiter, apiLimiter } from "./middleware/ratelimiter.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import adminRouter from "./routes/admin.routes.js";
import resultsRouter from "./routes/results.routes.js";
import testsRouter from "./routes/tests.routes.js";
import usersRouter from "./routes/users.routes.js";
import analyzeRouter from "./routes/analyze.routes.js";

import loggerMiddleware from "./middleware/logger.middleware.js";

const app = express();

app.set("trust proxy", 1);

const corsOptions = {
  origin: [
    "https://english-test-generator-frontend.vercel.app",
    "http://localhost:5173",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions));
app.use(globalLimiter);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(loggerMiddleware);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "🧠 English Test Generator Backend is running",
  });
});

// API Routes
app.use("/api/v1/quiz", quizRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/results", resultsRouter);
app.use("/api/v1/tests", apiLimiter, testsRouter);
app.use("/api/v1/users", apiLimiter, usersRouter);
app.use("/api/v1/analyze", apiLimiter, analyzeRouter);

// 404
app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌", err.message);

  res.status(500).json({
    message: "Internal Server Error",
  });
});

export default app;