import jwt from "jsonwebtoken";

export const authorizationMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from header

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "uneheer nuuts"); // Verify token
    req.user = decoded; // Store user info in request object
    next(); // Move to the next middleware
  } catch (err) {
    return res.status(403).json({ message: "Unauthorized: Invalid token" });
  }
};
