import { TokenDecode } from "../utility/tokenUtility.js";

export default (req, res, next) => {
  let token = req.headers["authorization"]; // Standard header for tokens
  if (!token) {
    return res.status(401).json({ status: "fail", message: "Unauthorized: No token provided" });
  }

  token = token.replace("Bearer ", ""); // Remove 'Bearer ' if present
  let decoded = TokenDecode(token);
  if (!decoded) {
    return res.status(401).json({ status: "fail", message: "Unauthorized: Invalid token" });
  }

  // Attach decoded data to `req.user` instead of modifying headers
  req.user = { email: decoded.email, user_id: decoded.user_id };
  next();
};
