import ApiError from "../Exceptions/ApiError.js";
import { logger } from "../Logs/Logger.js";
import TokenService from "../Services/TokenService.js";
import UserService from "../Services/UserService.js";

const OwnerMiddleware = async (req, res, next) => {
  try {
    logger.info("Entered to OwnerMiddleware");
    const authHeader = req.headers.authorization;
    if (!authHeader) throw next(ApiError.UnauthorizedError());
    const token = authHeader.split(" ")[1];
    const tokenData = await TokenService.validateAccessToken(token);
    if (!tokenData) throw next(ApiError.UnauthorizedError());
    req.userId = tokenData.userId;
    const uploadId = req.params.id;
    const userUploads = await UserService.getUserUploads(tokenData.userId);
    if (
      userUploads.uploads.find(
        (userUploadId) => String(userUploadId) === String(uploadId)
      ) ||
      // delete yourself
      tokenData.userId === uploadId
    ) {
      next();
    } else {
      next(ApiError.ForbiddenError());
    }
  } catch (e) {
    logger.error(`OwnerMiddleware. ${e.message}`);
    next(ApiError.UnauthorizedError());
  }
};
export default OwnerMiddleware;
