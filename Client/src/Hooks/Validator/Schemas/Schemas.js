import * as yup from "yup";

export const UserRegisterSchema = yup.object().shape({
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

export const UserLoginSchema = yup.object().shape({
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

export const UserUpdateSchema = yup.object().shape({
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

export const PostOnCreateSchema = yup.object().shape({
  title: yup
    .string("Type Error")
    .max(1000, "Max title lenght is 1000")
    .required("Title field is required"),
  body: yup
    .string("Type Error")
    .max(3000, "Max body lenght is 3000")
    .required("Body field is required"),
});

export const PostSchema = yup.object().shape({
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

export const PostUpdateSchema = yup.object().shape({
  title: yup.string("Type Error").max(1000, "Max title lenght is 1000"),
  body: yup.string("Type Error").max(3000, "Max body lenght is 3000"),
  userId: yup.string("Type error"),
  updatedAt: yup.date("Type Error"),
  createdAt: yup.date("Type Error"),
});

export const AnnouncementSchema = yup.object().shape({
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

export const AnnouncementUpdateSchema = yup.object().shape({
  title: yup.string("Type Error").max(500, "Max title lenght is 500"),
  body: yup.string("Type Error").max(1500, "Max body lenght is 1500"),
  userId: yup.string("Type error"),
  updatedAt: yup.date("Type Error"),
  createdAt: yup.date("Type Error"),
});

export const CommentSchema = yup.object().shape({
  body: yup
    .string("Type Error")
    .max(1000, "Max body lenght is 1000")
    .required("Body field is required"),
  userId: yup.string("Type error").required("Owner id is required"),
  postId: yup.string("Type error").required("Post id is required"),
  updatedAt: yup.date("Type Error").required("Update date is required"),
  createdAt: yup.date("Type Error").required("Creation date is required"),
});

export const CommentOnCreateSchema = yup.object().shape({
  body: yup
    .string("Type Error")
    .max(1000, "Max body lenght is 1000")
    .required("Body field is required"),
});

export const CommentUpdateSchema = yup.object().shape({
  body: yup.string("Type Error").max(1000, "Max body lenght is 1000"),
  userId: yup.string("Type error"),
  postId: yup.string("Type error"),
  updatedAt: yup.date("Type Error"),
  createdAt: yup.date("Type Error"),
});
