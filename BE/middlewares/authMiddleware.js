import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  //middleware..
  const token = req.headers.authorization?.split(" ")[1]; // to etract the token from uthorization header
  if (!token)
    return res.status(401).json({ message: "Access denied to the system.." });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; // ading the decoded token to the request object..
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
