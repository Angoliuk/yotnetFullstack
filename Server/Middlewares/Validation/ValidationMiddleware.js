import {
  AnnouncementSchema,
  CommentSchema,
  PostSchema,
  UserLoginSchema,
  UserRegisterSchema,
  UserUpdateSchema,
} from "./Schemas/Schemas.js";
import { object } from "yup";

const validate = async (schema, method, data) => {
  if (method === "PATCH")
    schema = schema.concat(
      object({ _id: string("Type Error").required("Id field required") })
    );
  await schema
    .validate(data, {
      abortEarly: false,
    })
    .catch((e) => {
      throw e.errors;
    });
};

const ValidationMiddleware = async (req, res, next) => {
  try {
    if (["POST", "PATCH"].includes(req.method)) {
      switch (req.path.split("/")[1]) {
        case "posts":
          const error = await validate(PostSchema, req.method, req.body);
          console.log(error);
        case "comments":
          await validate(CommentSchema, req.method, req.body);
          break;
        case "announcements":
          await validate(AnnouncementSchema, req.method, req.body);
          break;
        case "login":
          await validate(UserLoginSchema, req.method, req.body);
          break;
        case "register":
          await validate(UserRegisterSchema, req.method, req.body);
          break;
        case "users":
          await validate(UserUpdateSchema, req.method, req.body);
          break;
        default:
          res.status(400);
          break;
      }
    }
    next();
  } catch (e) {
    res.status(400).json(e);
  }
};

export default ValidationMiddleware;
