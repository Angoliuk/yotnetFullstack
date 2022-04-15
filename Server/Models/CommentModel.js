import mongoose from "mongoose";

const CommentModel = new mongoose.Schema({
  postId: { type: mongoose.Types.ObjectId, required: true, ref: "PostModel" },
  body: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "UserModel" },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

export default mongoose.model("CommentModel", CommentModel);
