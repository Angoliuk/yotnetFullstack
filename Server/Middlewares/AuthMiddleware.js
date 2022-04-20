import ApiError from "../Exceptions/ApiError.js";
import { logger } from "../Logs/Logger.js";
import TokenService from "../Services/TokenService.js";

const AuthMiddleware = async (req, res, next) => {
  try {
    logger.info("Entered to AuthMiddleware");
    const authHeader = req.headers.authorization;
    if (!authHeader) throw next(ApiError.UnauthorizedError());
    const token = authHeader.split(" ")[1];
    const tokenData = await TokenService.validateAccessToken(token);
    if (!tokenData) throw next(ApiError.UnauthorizedError());
    console.log(tokenData);
    req.userId = tokenData.userId;
    next();
  } catch (e) {
    logger.error(`AuthMiddleware. ${e.message}`);
    next(ApiError.UnauthorizedError());
  }
};
export default AuthMiddleware;
