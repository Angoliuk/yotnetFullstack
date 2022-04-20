import { CommentDTO } from "../DTO/CommentDTO.js";
import { QueryFilter } from "../Helpers/QueryFilter.js";
import {
  DeleteFromUserUploads,
  AddToUserUploads,
} from "../Helpers/userUploads.js";
import { logger } from "../Logs/Logger.js";
import CommentModel from "../Models/CommentModel.js";

class CommentService {
  async update(commentId, commenttData) {
    const comment = await CommentModel.findByIdAndUpdate(
      commentId,
      commenttData,
      {
        new: true,
      }
    );
    console.log(comment);
    const commentDTO = new CommentDTO(comment);
    logger.info("CommentService update done");
    return commentDTO;
  }

  async getAll(query) {
    const comments = await QueryFilter(CommentModel, query);
    const commentsDTO = comments.map((comment) => new CommentDTO(comment));
    logger.info("CommentService getAll done");
    return commentsDTO;
  }

  async getOne(commentId) {
    const comment = await CommentModel.findById(commentId);
    const commentDTO = new CommentDTO(comment);
    logger.info("CommentService getOne done");
    return commentDTO;
  }

  async delete(commentId, userId) {
    await CommentModel.findByIdAndDelete(commentId);
    await DeleteFromUserUploads(userId, commentId);
    logger.info("CommentService delete done");
  }

  async create(commentData, userId) {
    const comment = await CommentModel.create(commentData);
    await AddToUserUploads(userId, comment._id);
    const commentDTO = new CommentDTO(comment);
    logger.info("CommentService create done");
    return commentDTO;
  }
}

export default new CommentService();
