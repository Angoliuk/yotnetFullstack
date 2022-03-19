import UserService from "../Services/UserService.js";

export const DeleteFromUserUploads = async (userId, uploadId) => {
  const userUploads = await UserService.getUserUploads(userId);
  userUploads.uploads = userUploads.uploads.filter(
    (userUploadId) => String(userUploadId) !== String(uploadId)
  );
  await UserService.updateUserUploads(userId, userUploads.uploads);
};

export const AddToUserUploads = async (userId, uploadId) => {
  const userUploads = await UserService.getUserUploads(userId);
  userUploads.uploads.push(uploadId);
  await UserService.updateUserUploads(userId, userUploads.uploads);
};
