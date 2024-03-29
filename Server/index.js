import mongoose from "mongoose";
import express from "express";
import UserRouter from "./Routers/UserRouter.js";
import PostRouter from "./Routers/PostRouter.js";
import CommentRouter from "./Routers/CommentRouter.js";
import AnnouncementRouter from "./Routers/AnnouncementRouter.js";
import AuthRouter from "./Routers/AuthRouter.js";
import cors from "cors";
import path from "path";
import { logger } from "./Logs/Logger.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./Middlewares/ErrorMiddleware.js";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(express.static(path.resolve() + "/Static"));
app.use(cookieParser());
app.use("/auth", AuthRouter);
app.use("/users", UserRouter);
app.use("/posts", PostRouter);
app.use("/comments", CommentRouter);
app.use("/announcements", AnnouncementRouter);
app.use(ErrorMiddleware);

const start = async (PORT, DB_URL) => {
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

start(process.env.PORT, process.env.DB_URL);
