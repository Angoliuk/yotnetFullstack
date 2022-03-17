import mongoose from "mongoose";
import express from "express";
import UserRouter from "./Routers/UserRouter.js";
import PostRouter from "./Routers/PostRouter.js";
import CommentRouter from "./Routers/CommentRouter.js";
import AnnouncementRouter from "./Routers/AnnouncementRouter.js";
import AuthRouter from "./Routers/AuthRouter.js";
import { DB_URL, PORT } from "./config.js";
import AccessMiddleware from "./Middlewares/AccessMiddleware.js";
import cors from "cors";
import ValidationMiddleware from "./Middlewares/Validation/ValidationMiddleware.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("", ValidationMiddleware, AuthRouter);
app.use("/:access", [ValidationMiddleware, AccessMiddleware], UserRouter);
app.use("/:access", [ValidationMiddleware, AccessMiddleware], PostRouter);
app.use("/:access", [ValidationMiddleware, AccessMiddleware], CommentRouter);
app.use(
  "/:access",
  [ValidationMiddleware, AccessMiddleware],
  AnnouncementRouter
);

//validation

const start = async () => {
  try {
    mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => console.log("Running on the port " + PORT));
  } catch (e) {
    console.log(e);
  }
};

start();