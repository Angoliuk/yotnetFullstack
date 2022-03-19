import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";

const AuthMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw "No JWT token";
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, (e, tokenData) => {
      if (e) {
        throw e;
      }
      req.userId = tokenData._id;
    });
    next();
  } catch (e) {
    res.status(400).json([e.message]);
  }
};
export default AuthMiddleware;
