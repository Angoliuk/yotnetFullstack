import { unlink } from "fs";
export const DeleteFiles = (filesToDelete) => {
  filesToDelete.forEach((file) => {
    unlink(file.path, (err) => {
      console.log(err);
    });
  });
};
