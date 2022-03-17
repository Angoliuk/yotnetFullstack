import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";

const AuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        res.status(403).json(err);
        console.log(err);
      }
      req.user = user;
    });
    next();
  } else {
    res.sendStatus(401);
  }
};
export default AuthMiddleware;
