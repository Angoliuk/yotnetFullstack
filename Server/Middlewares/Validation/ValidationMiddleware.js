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
    const reqInfo = req._parsedUrl.pathname.split("/");
    if (["POST", "PATCH"].includes(req.method)) {
      const schema = schemas[req.method][reqInfo[2]];
      if (!schema) throw ["Wrong path"];
      await validate(schema, req.body);
    }
    next();
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

export default ValidationMiddleware;
