import { compareSync, hashSync } from "bcrypt";
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
      throw new Error("no user");
    }
    const isSamePasswords = compareSync(password, candidate.password);
    if (isSamePasswords) {
      const token = generateJWT(candidate._id);
      return { ...candidate._doc, accessToken: token };
    } else {
      throw new Error("wrong password");
    }
  }

  async register(userData) {
    const candidate = await UserModel.findOne({ email: userData.email });
    if (candidate) {
      console.log("error");
      throw new Error("already exists");
    }
    const hashedPassword = hashSync(userData.password, SALT);
    const user = new UserModel({
      ...userData,
      password: hashedPassword,
    });
    await user.save();
    const token = generateJWT(user._doc._id);
    return { ...user._doc, accessToken: token };
  }
}

export default new AuthService();
