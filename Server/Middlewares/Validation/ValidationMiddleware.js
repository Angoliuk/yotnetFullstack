import { schemas } from "./Schemas/Schemas.js";

const validate = async (schema, data) => {
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
    console.log(req);
    const reqInfo = req.originalUrl.split("/");
    console.log(reqInfo);
    const schemaName = ["login", "register"].includes(reqInfo[2])
      ? reqInfo[2]
      : reqInfo[1];
    const schema = schemas[req.method][schemaName];
    if (!schema) throw ["Wrong schema path"];
    await validate(schema, req.body);
    next();
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

export default ValidationMiddleware;
