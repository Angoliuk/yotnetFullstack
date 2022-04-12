import argon2 from "argon2";
import { SALT, SECRET } from "../config.js";
import UserModel from "../Models/UserModel.js";
import jwt from "jsonwebtoken";

const generateJWT = (_id) => {
  return jwt.sign(
    {
      _id,
    },
    SECRET,
    { expiresIn: "24h" }
  );
};

class AuthService {
  async login(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (!candidate) {
      logger.error("AuthService login. No such user");
      throw { message: "no such user" };
    }
    const isSamePasswords = await argon2.verify(candidate.password, password);
    if (isSamePasswords) {
      const token = generateJWT(candidate._id);
      logger.info("AuthService login done");
      return { ...candidate._doc, accessToken: token };
    } else {
      logger.info("AuthService login. Wrong password");
      throw { message: "wrong password" };
    }
  }

  async register(userData) {
    const candidate = await UserModel.findOne({ email: userData.email });
    if (candidate) {
      logger.error("AuthService register. User already exists");
      throw { message: "User already exists" };
    }
    const hashedPassword = await argon2.hash(userData.password);
    const user = new UserModel({
      ...userData,
      password: hashedPassword,
    });
    await user.save();
    const token = generateJWT(user._doc._id);
    logger.info("AuthService register done");
    return { ...user._doc, accessToken: token };
  }
}

export default new AuthService();
