import mongoose from "mongoose";
const UserModel = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  avatar: { type: String, required: true },
  age: { type: Number, required: true },
  uploads: { type: Array },
});

export default mongoose.model("UserModel", UserModel);
