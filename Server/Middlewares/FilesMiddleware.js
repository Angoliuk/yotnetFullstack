import multer from "multer";

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
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export default multer({ storage, FileFilter });
