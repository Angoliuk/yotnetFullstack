import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
import AnnouncementService from "../Services/AnnouncementService.js";
import CommentService from "../Services/CommentService.js";
import PostService from "../Services/PostService.js";
import UserService from "../Services/UserService.js";

const OwnerMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, async (err, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }

      const reqInfo = req.url.split("/");
      switch (reqInfo[1]) {
        case "users":
          const userToChange = await UserService.getOne(reqInfo[2]);
          if (String(userToChange._id) !== String(user._id))
            return res.sendStatus(403);

          break;
        case "posts":
          const post = await PostService.getOne(reqInfo[2]);
          if (String(post.userId) !== String(user._id))
            return res.sendStatus(403);

          break;

        case "comments":
          const comment = await CommentService.getOne(reqInfo[2]);
          if (String(comment.userId) !== String(user._id))
            return res.sendStatus(403);
          break;

        case "announcements":
          const announcement = await AnnouncementService.getOne(reqInfo[2]);
          if (String(announcement.userId) !== String(user._id))
            return res.sendStatus(403);
          break;

        default:
          return res.sendStatus(403);
      }
      // if (user._id !== req.body.userId) return res.sendStatus(401);
    });

    next();
  } else {
    return res.sendStatus(401);
  }
};
export default OwnerMiddleware;
