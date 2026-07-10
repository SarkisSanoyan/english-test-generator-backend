import app from "../app.js";
import { connectDB } from "../config/db.js";
import { connectRedis } from "../config/redis.js";

const allowedOrigins = [
  "https://english-test-generator-frontend.vercel.app",
  "http://localhost:5173",
];

let initialized = false;

const setCorsHeaders = (req, res) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    res.setHeader("Vary", "Origin");
  }
};

export default async function handler(req, res) {
  setCorsHeaders(req, res);
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (!initialized) {
    await connectDB();
    await connectRedis();
    initialized = true;
  }

  return app(req, res);
}