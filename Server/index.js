import mongoose from "mongoose";
import express from "express";
import UserRouter from "./Routers/UserRouter.js";
import PostRouter from "./Routers/PostRouter.js";
import CommentRouter from "./Routers/CommentRouter.js";
import AnnouncementRouter from "./Routers/AnnouncementRouter.js";
import AuthRouter from "./Routers/AuthRouter.js";
import { DB_URL, PORT } from "./config.js";
import cors from "cors";
import path from "path";
import { logger } from "./Logs/Logger.js";

const app = express();
app.use(express.json());
app.use(express.static(path.resolve() + "/Static"));
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/users", UserRouter);
app.use("/posts", PostRouter);
app.use("/comments", CommentRouter);
app.use("/announcements", AnnouncementRouter);

const start = async () => {
  try {
    mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => logger.info("Running on the port " + PORT));
  } catch (e) {
    logger.error(e);
  }
};

start();
