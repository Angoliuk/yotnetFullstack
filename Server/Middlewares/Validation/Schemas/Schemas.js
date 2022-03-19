import * as yup from "yup";

const UserRegisterSchema = yup.object().shape({
  email: yup
    .string("Type Error")
    .email("Enter correct email")
    .required("Email field is required"),
  password: yup
    .string("Type Error")
    .trim()
    .max(300, "Max password lenght is 300")
    .min(6, "Min password lenght is 6")
    .required("Password field is required"),
  lastname: yup
    .string("Type Error")
    .trim()
    .max(100, "Max lastname lenght is 100")
    .required("Lastname field is required"),
  firstname: yup
    .string("Type Error")
    .trim()
    .max(100, "Max firstname lenght is 100")
    .required("Firstname field is required"),
  age: yup
    .number("Type Error")
    .integer("You may be under 14")
    .min(14, "You may be under 14")
    .required("Age field if required"),
});

const UserLoginSchema = yup.object().shape({
  email: yup
    .string("Type Error")
    .email("Enter correct email")
    .required("Email field is required"),
  password: yup
    .string("Type Error")
    .trim()
    .max(300, "Max password lenght is 300")
    .min(6, "Min password lenght is 6")
    .required("Password field is required"),
});

const UserUpdateSchema = yup.object().shape({
  email: yup.string("Type Error").email("Enter correct email"),
  password: yup
    .string("Type Error")
    .trim()
    .max(300, "Max password lenght is 300")
    .min(6, "Min password lenght is 6"),
  lastname: yup
    .string("Type Error")
    .trim()
    .max(100, "Max lastname lenght is 100"),
  firstname: yup
    .string("Type Error")
    .trim()
    .max(100, "Max firstname lenght is 100"),
  age: yup
    .number("Type Error")
    .integer("You may be under 14")
    .min(14, "You may be under 14"),
});

const PostSchema = yup.object().shape({
  title: yup
    .string("Type Error")
    .max(1000, "Max title lenght is 1000")
    .required("Title field is required"),
  body: yup
    .string("Type Error")
    .max(3000, "Max body lenght is 3000")
    .required("Body field is required"),
  userId: yup.string("Type error").required("Owner id is required"),
  updatedAt: yup.date("Type Error").required("Update date is required"),
  createdAt: yup.date("Type Error").required("Creation date is required"),
});

const PostUpdateSchema = yup.object().shape({
  title: yup
    .string("Type Error")
    .max(1000, "Max title lenght is 1000")
    .required("Title field is required"),
  body: yup
    .string("Type Error")
    .max(3000, "Max body lenght is 3000")
    .required("Body field is required"),
  userId: yup.string("Type error"),
  updatedAt: yup.date("Type Error").required("Update date is required"),
  createdAt: yup.date("Type Error"),
});

const AnnouncementSchema = yup.object().shape({
  title: yup
    .string("Type Error")
    .max(500, "Max title lenght is 500")
    .required("Title field is required"),
  body: yup
    .string("Type Error")
    .max(1500, "Max body lenght is 1500")
    .required("Body field is required"),
  userId: yup.string("Type error").required("Owner id is required"),
  updatedAt: yup.date("Type Error").required("Update date is required"),
  createdAt: yup.date("Type Error").required("Creation date is required"),
});

const AnnouncementUpdateSchema = yup.object().shape({
  title: yup
    .string("Type Error")
    .max(500, "Max title lenght is 500")
    .required("Title field is required"),
  body: yup
    .string("Type Error")
    .max(1500, "Max body lenght is 1500")
    .required("Body field is required"),
  userId: yup.string("Type error"),
  updatedAt: yup.date("Type Error").required("Update date is required"),
  createdAt: yup.date("Type Error"),
});

const CommentSchema = yup.object().shape({
  body: yup
    .string("Type Error")
    .max(1000, "Max body lenght is 1000")
    .required("Body field is required"),
  userId: yup.string("Type error").required("Owner id is required"),
  postId: yup.string("Type error").required("Post id is required"),
  updatedAt: yup.date("Type Error").required("Update date is required"),
  createdAt: yup.date("Type Error").required("Creation date is required"),
});

const CommentUpdateSchema = yup.object().shape({
  body: yup
    .string("Type Error")
    .max(1000, "Max body lenght is 1000")
    .required("Body field is required"),
  userId: yup.string("Type error"),
  postId: yup.string("Type error"),
  updatedAt: yup.date("Type Error").required("Update date is required"),
  createdAt: yup.date("Type Error"),
});

export const schemas = {
  POST: {
    login: UserLoginSchema,
    register: UserRegisterSchema,
    posts: PostSchema,
    comments: CommentSchema,
    announcements: AnnouncementSchema,
  },
  PATCH: {
    users: UserUpdateSchema,
    posts: PostUpdateSchema,
    comments: CommentUpdateSchema,
    announcements: AnnouncementUpdateSchema,
  },
};
