import multer from "multer";
import { logger } from "../Logs/Logger.js";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./Static");
  },
  filename(req, file, cb) {
    cb(null, Math.random() + "-" + Date.now() + "-" + file.originalname);
  },
});

const types = ["image/png", "image/jpeg", "image/jpg"];

const FileFilter = (req, file, cb) => {
  if (types.includes(file.mimeType)) {
    logger.info("FilesMiddleware. File accepted");
    cb(null, true);
  } else {
    logger.info("FilesMiddleware. File rejected");
    cb(null, false);
  }
};

export default multer({ storage, FileFilter });
