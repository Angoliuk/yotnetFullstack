import { QueryFilter } from "../Helpers/QueryFilter.js";
import CommentModel from "../Models/CommentModel.js";

class CommentService {
  async update(_id, postData) {
    const comment = await CommentModel.findOneAndUpdate({ _id }, postData, {
      new: true,
    });

    return comment;
  }
  async getAll(query) {
    const comments = await QueryFilter(CommentModel, query);
    return comments;
  }
  async getOne(_id) {
    if (!_id) {
      throw new Error("get one");
    }
    const comments = await CommentModel.findOne({ _id });
    return comments;
  }
  async delete(_id) {
    const comment = await CommentModel.findOneAndDelete({ _id });
    return comment;
  }
  async create(commentData) {
    const comment = await CommentModel.create(commentData);
    return comment;
  }
}

export default new CommentService();
