import app from "../app.js";
import { connectDB } from "../config/db.js";
import { connectRedis } from "../config/redis.js";

let initialized = false;

export default async function handler(req, res) {
  if (!initialized) {
    await connectDB();
    await connectRedis();
    initialized = true;
  }

  return app(req, res);
}
