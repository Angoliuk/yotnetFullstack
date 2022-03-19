import { QueryFilter } from "../Helpers/QueryFilter.js";
import {
  DeleteFromUserUploads,
  AddToUserUploads,
} from "../Helpers/userUploads.js";
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

    return comment;
  }
  async getAll(query) {
    const comments = await QueryFilter(CommentModel, query);
    return comments;
  }
  async getOne(commentId) {
    if (!commentId) {
      throw new Error("get one");
    }
    const comments = await CommentModel.findOne({ _id: commentId });
    return comments;
  }
  async delete(commentId, userId) {
    await CommentModel.findOneAndDelete({ _id: commentId });
    await DeleteFromUserUploads(userId, commentId);
  }
  async create(commentData, userId) {
    const comment = await CommentModel.create(commentData);
    await AddToUserUploads(userId, comment._id);
    return comment;
  }
}

export default new CommentService();
