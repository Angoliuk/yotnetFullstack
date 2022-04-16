import mongoose from "mongoose";

const TokenModel = new mongoose.Schema({
  userId: { type: String, required: true, ref: "UserModel" },
  refreshToken: { type: String, required: true },
});

export default mongoose.model("TokenModel", TokenModel);
