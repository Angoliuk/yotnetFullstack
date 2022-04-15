import jwt from "jsonwebtoken";
import ApiError from "../Exceptions/ApiError.js";
import { logger } from "../Logs/Logger.js";
import UserService from "../Services/UserService.js";

const OwnerMiddleware = async (req, res, next) => {
  try {
    logger.info("Entered to OwnerMiddleware");
    const authHeader = req.headers.authorization;
    if (!authHeader) throw "No JWT token";
    const token = authHeader.split(" ")[1];
    const tokenData = TokenService.validateAccessToken(token);
    if (!tokenData) throw next(ApiError.UnauthorizedError());
    req.userId = tokenData._id;
    const uploadId = req._parsedUrl.pathname.split("/")[2];
    const userUploads = await UserService.getUserUploads(tokenData._id);
    if (
      !userUploads.uploads.find(
        (userUploadId) => String(userUploadId) === String(uploadId)
      ) ||
      userId !== uploadId
    ) {
      next(ApiError.ForbiddenError());
    }
    next();
  } catch (e) {
    logger.error(`OwnerMiddleware. ${e.message}`);
    next(ApiError.ForbiddenError());
  }
};
export default OwnerMiddleware;
