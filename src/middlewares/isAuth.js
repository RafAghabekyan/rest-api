import jwt from "jsonwebtoken";
import { tokensAdapter } from "../adapters/index.js";

const authenticateMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      return res.status(401).json({ error: "Not authenticated." });
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(403).json({ error: "Invalid Token." });
    }
    const tokenExists = await tokensAdapter.findOne({ userId: decodedToken.id });
    if (!tokenExists) {
      return res.status(401).json({ error: "Authentication failed." });
    }
    req.user = { id: decodedToken.id };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Authentication failed." });
  }
};

export default authenticateMiddleware;
