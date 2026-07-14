import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token = null;

  if (
    authHeader &&
    typeof authHeader === "string" &&
    authHeader.startsWith("Bearer ")
  ) {
    token = authHeader.substring(7);
  } else if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    return res.status(401).json({
      error: "Authentication required"
    });
  }

  if (!config.accessSecret) {
    console.error("ACCESS_TOKEN_SECRET missing");
    return res.status(500).json({
      error: "Server configuration error"
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      config.accessSecret
    );

    req.user = decoded;

    next();

  } catch (error) {
    console.error(
      "JWT ERROR:",
      error.name,
      error.message
    );

    return res.status(401).json({
      error: "Invalid or expired access token"
    });
  }
};


export const isAdmin = (req, res, next) => {
  if (req.user?.role === "admin") {
    return next();
  }

  return res.status(403).json({
    message: "Access Denied: Admins Only"
  });
};