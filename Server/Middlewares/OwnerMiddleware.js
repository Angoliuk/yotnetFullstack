import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
import UserService from "../Services/UserService.js";

const OwnerMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw "No JWT token";
    const token = authHeader.split(" ")[1];
    const userId = jwt.verify(token, SECRET, (e, tokenData) => {
      if (e) {
        throw e;
      }
      req.userId = tokenData._id;
      return tokenData._id;
    });
    const uploadId = req._parsedUrl.pathname.split("/")[3];
    const userUploads = await UserService.getUserUploads(userId);
    console.log(uploadId, userUploads, userId);
    if (
      userUploads.uploads.find(
        (userUploadId) => String(userUploadId) === String(uploadId)
      ) ||
      userId === uploadId
    ) {
      next();
    } else {
      throw {
        status: 403,
        message: "Your are not an owner of this upload",
      };
    }
  } catch (e) {
    console.log(e);
    res.status(e.status ? e.status : 400).json([e.message]);
  }
};
export default OwnerMiddleware;
