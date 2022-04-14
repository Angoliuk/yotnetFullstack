import { logger } from "../Logs/Logger.js";
import AnnouncementModel from "../Models/AnnouncementModel.js";
import CommentModel from "../Models/CommentModel.js";
import PostModel from "../Models/PostModel.js";
import UserService from "../Services/UserService.js";
import { DeleteFiles } from "./DeleteFiles.js";

export const DeleteFromUserUploads = async (userId, uploadId) => {
  logger.info("Entered to DeleteFromUserUploads");
  const userUploads = await UserService.getUserUploads(userId);
  userUploads.uploads = userUploads.uploads.filter(
    (userUploadId) => String(userUploadId) !== String(uploadId)
  );
  await UserService.updateUserUploads(userId, userUploads.uploads);
};

export const AddToUserUploads = async (userId, uploadId) => {
  logger.info("Entered to AddToUserUploads");
  const userUploads = await UserService.getUserUploads(userId);
  userUploads.uploads.push(uploadId);
  await UserService.updateUserUploads(userId, userUploads.uploads);
};

export const DeletePostComments = async (postId) => {
  logger.info("Entered to DeletePostComments");
  const commentsToDelete = await CommentModel.find({ postId });
  commentsToDelete.forEach((comment) => {
    logger.info(postId, comment);
    DeleteFromUserUploads(comment.userId, comment._id);
  });
  await CommentModel.deleteMany({ postId });
};

export const DeleteUserPosts = async (userId) => {
  logger.info("Entered to DeleteUserPosts");
  const postsToDelete = await PostModel.find({ userId });
  postsToDelete.forEach((post) => {
    logger.info(userId, post);
    DeletePostComments(post._id);
    post?.photos && DeleteFiles(post.photos);
    DeleteFromUserUploads(userId, post._id);
  });
  await PostModel.deleteMany({ userId });
};

export const DeleteUserAnnouncements = async (userId) => {
  logger.info("Entered to DeleteUserAnnouncements");
  const announcementsToDelete = await AnnouncementModel.find({ userId });
  announcementsToDelete.forEach((announcement) => {
    logger.info(userId, announcement);
    announcement?.photos && DeleteFiles(announcement.photos);
    DeleteFromUserUploads(userId, announcement._id);
  });
  await AnnouncementModel.deleteMany({ userId });
};

export const DeleteUserComments = async (userId) => {
  logger.info("Entered to DeleteUserComments");
  const commentsToDelete = await CommentModel.find({ userId });
  commentsToDelete.forEach((comment) => {
    logger.info(userId, comment);
    DeleteFromUserUploads(userId, comment._id);
  });
  await CommentModel.deleteMany({ userId });
};
