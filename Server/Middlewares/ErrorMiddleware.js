import ApiError from "../Exceptions/ApiError.js";
import { logger } from "../Logs/Logger.js";

export const ErrorMiddleware = (err, req, res, next) => {
  logger.error(`ErrorMiddleware ${err.status}, ${err.message}`);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "Server error" });
};
