import mongoose from "mongoose";

const TokenModel = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "UserModel" },
  refreshToken: { type: String, required: true },
});

export default mongoose.model("TokenModel", TokenModel);
