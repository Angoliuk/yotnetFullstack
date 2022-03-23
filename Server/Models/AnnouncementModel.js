import mongoose from "mongoose";

const AnnouncementModel = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  photos: { type: Array },
});

export default mongoose.model("AnnouncementModel", AnnouncementModel);
