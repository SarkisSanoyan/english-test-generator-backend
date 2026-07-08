// import { rateLimit } from "express-rate-limit";
// import { RedisStore } from "rate-limit-redis";
// import redisClient from "../config/redis.js";

// // Helper for creating Redis store
// const createRedisStore = (prefix) =>
//   new RedisStore({
//     sendCommand: (...args) => redisClient.sendCommand(args),
//     prefix: `rl:${prefix}:`,
//   });

// // GLOBAL LIMITER
// export const globalLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 min
//   limit: 5000,
//   standardHeaders: true,
//   legacyHeaders: false,
//   message: "Too many requests, please try again later.",
//   store: createRedisStore("global"),
//   skip: (req) => req.method === "OPTIONS",
// });

// // 2. AUTH LIMITER
// export const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   limit: 200,
//   standardHeaders: true,
//   legacyHeaders: false,
//   statusCode: 429,
//   message: {
//     error: "Too many authentication attempts. Please try again later.",
//     retryAfter: Math.ceil(15 * 60),
//   },
//   store: createRedisStore("auth"),
//   skip: (req) => req.method === "OPTIONS",
// });

// // 3. REGISTRATION LIMITER (24 hours)
// export const registrationLimiter = rateLimit({
//   windowMs: 24 * 60 * 60 * 1000, // 24 hours
//   limit: 200,
//   standardHeaders: true,
//   legacyHeaders: false,
//   statusCode: 429,
//   message: {
//     error: "Too many accounts created from this IP. Please try again later.",
//     retryAfter: Math.ceil(24 * 60 * 60),
//   },
//   store: createRedisStore("register"),
//   skip: (req) => req.method === "OPTIONS",
// });

// // 4. API LIMITER (for demanding requests, test generation)
// export const apiLimiter = rateLimit({
//   windowMs: 60 * 60 * 1000, // 1 hour
//   limit: 200,
//   standardHeaders: true,
//   legacyHeaders: false,
//   message: {
//     error: "Hourly API limit exceeded. Upgrade your plan for more requests.",
//   },
//   store: createRedisStore("api"),
//   skip: (req) => req.method === "OPTIONS",
// });

// // 5. FORGOT PASSWORD LIMITER (strict: 5 per hour)
// export const forgotPasswordLimiter = rateLimit({
//   windowMs: 60 * 60 * 1000, // 1 hour
//   limit: 20,
//   standardHeaders: true,
//   legacyHeaders: false,
//   statusCode: 429,
//   message: {
//     error: "Too many password reset attempts. Please try again in 1 hour.",
//   },
//   store: createRedisStore("forgot-password"),
//   skip: (req) => req.method === "OPTIONS",
// });






import { rateLimit } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import redisClient from "../config/redis.js";

const createRedisStore = (prefix) =>
  new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
    prefix: `rl:${prefix}:`,
  });

const skipOptions = (req) => req.method === "OPTIONS";

const createHandler = (message, retryAfter = null) => (req, res) => {
  res.status(429).json({
    success: false,
    error: message,
    ...(retryAfter && { retryAfter }),
  });
};

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5000,
  standardHeaders: true,
  legacyHeaders: false,
  store: createRedisStore("global"),
  skip: skipOptions,
  handler: createHandler(
    "Too many requests. Please try again later."
  ),
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 50,
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
  store: createRedisStore("auth"),
  skip: skipOptions,
  handler: createHandler(
    "Too many authentication attempts. Please try again later.",
    15 * 60
  ),
});

export const registrationLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
  store: createRedisStore("register"),
  skip: skipOptions,
  handler: createHandler(
    "Too many accounts created from this IP. Please try again later.",
    24 * 60 * 60
  ),
});

export const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  store: createRedisStore("api"),
  skip: skipOptions,
  handler: createHandler(
    "Hourly API limit exceeded. Upgrade your plan for more requests."
  ),
});

export const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
  store: createRedisStore("forgot-password"),
  skip: skipOptions,
  handler: createHandler(
    "Too many password reset attempts. Please try again in 1 hour."
  ),
});

