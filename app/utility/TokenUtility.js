import { JWT_EXPIRE_TIME, JWT_KEY } from "../configs/config.js";
import jwt from "jsonwebtoken";

/**
 * Generates a JWT token with email & user_id.
 */
export const TokenEncode = (email, user_id) => {
  return jwt.sign(
      { email, user_id }, // Payload
      JWT_KEY, // Secret key
      { expiresIn: JWT_EXPIRE_TIME } // Expiry time
  );
};

/**
 * Decodes and verifies a JWT token.
 */
export const TokenDecode = (token) => {
  try {
    return jwt.verify(token, JWT_KEY);
  } catch (e) {
    console.error("Token verification failed:", e.message); // Debugging log
    return null;
  }
};
