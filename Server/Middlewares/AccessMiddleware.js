import AuthMiddleware from "./AuthMiddleware.js";
import OwnerMiddleware from "./OwnerMiddleware.js";

const AccessMiddleware = (req, res, next) => {
  const accessCode = req.params.access;
  console.log(accessCode);
  if (accessCode.length !== 3) return res.sendStatus(405);
  if (accessCode === "420") return AuthMiddleware(req, res, next);
  if (accessCode === "440") return OwnerMiddleware(req, res, next);
  return res.sendStatus(403);
};

export default AccessMiddleware;
