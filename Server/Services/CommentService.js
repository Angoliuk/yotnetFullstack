import { QueryFilter } from "../Helpers/QueryFilter.js";
import {
  DeleteFromUserUploads,
  AddToUserUploads,
} from "../Helpers/userUploads.js";
import { logger } from "../Logs/Logger.js";
import CommentModel from "../Models/CommentModel.js";

class CommentService {
  async update(commentId, commenttData) {
    const comment = await CommentModel.findOneAndUpdate(
      { _id: commentId },
      commenttData,
      {
        new: true,
      }
    );
    logger.info("CommentService update done");
    return comment;
  }
  async getAll(query) {
    const comments = await QueryFilter(CommentModel, query);
    logger.info("CommentService getAll done");
    return comments;
  }
  async getOne(commentId) {
    if (!commentId) {
      throw new Error("get one");
    }
    const comments = await CommentModel.findOne({ _id: commentId });
    logger.info("CommentService getOne done");
    return comments;
  }
  async delete(commentId, userId) {
    await CommentModel.findOneAndDelete({ _id: commentId });
    await DeleteFromUserUploads(userId, commentId);
    logger.info("CommentService delete done");
  }
  async create(commentData, userId) {
    const comment = await CommentModel.create(commentData);
    await AddToUserUploads(userId, comment._id);
    logger.info("CommentService create done");
    return comment;
  }
}

export default new CommentService();
