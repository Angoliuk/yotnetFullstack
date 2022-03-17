import mongoose from "mongoose";

const CommentModel = new mongoose.Schema({
  postId: { type: String, required: true },
  body: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

export default mongoose.model("CommentModel", CommentModel);
