import app from "../app.js";
import { connectDB } from "../config/db.js";
import { connectRedis } from "../config/redis.js";

let initialized = false;

export default async function handler(req, res) {
  try {
    if (!initialized) {
      await connectDB();
      await connectRedis();
      initialized = true;
    }

    return app(req, res);
  } catch (error) {
    console.error("Server initialization error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}