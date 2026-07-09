import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export const verifyToken = (req, res, next) => {
  // Support token supplied either via cookie (`accessToken`) or
  // Authorization header (`Bearer <token>`).
  const authHeader = req.headers.authorization || req.headers.Authorization;
  let token = null;

  if (authHeader && typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, config.accessSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired access token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access Denied: Admins Only" });
  }
};

