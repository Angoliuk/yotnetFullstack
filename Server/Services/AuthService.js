import argon2 from "argon2";
import UserModel from "../Models/UserModel.js";
import { logger } from "../Logs/Logger.js";
import TokenService from "./TokenService.js";
import ApiError from "../Exceptions/ApiError.js";
import { AuthUserDTO } from "../DTO/AuthUserDTO.js";

class AuthService {
  async login(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (!candidate) {
      logger.error("AuthService login. No such user");
      throw ApiError.BadRequestError("No such user");
    }
    const isSamePasswords = await argon2.verify(candidate.password, password);
    if (!isSamePasswords) {
      logger.error("AuthService login. Wrong password");
      throw ApiError.BadRequestError("Wrong password");
    }
    const tokens = await TokenService.generateAndSaveToken(candidate._id);
    const userDTO = new AuthUserDTO({ ...candidate._doc, ...tokens });
    logger.info("AuthService login done");
    return { data: userDTO, refreshToken: tokens.refreshToken };
  }

  async logout(refreshToken) {
    await TokenService.removeToken(refreshToken);
  }

  async register(userData) {
    const candidate = await UserModel.findOne({ email: userData.email });
    if (candidate) {
      logger.error("AuthService register. User already exists");
      throw ApiError.BadRequestError("User already exists");
    }
    const hashedPassword = await argon2.hash(userData.password);
    const user = await UserModel.create({
      ...userData,
      password: hashedPassword,
    });
    const tokens = await TokenService.generateAndSaveToken(user._id);
    const userDTO = new AuthUserDTO({ ...user._doc, ...tokens });
    logger.info("AuthService register done");
    return { data: userDTO, refreshToken: tokens.refreshToken };
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      ApiError.UnauthorizedError();
    }
    const userData = await TokenService.validateRefreshToken(refreshToken);
    const dbToken = await TokenService.findToken(refreshToken);
    console.log(userData);
    console.log(dbToken);
    if (!dbToken || !userData) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.userId);
    const tokens = await TokenService.generateTokens({ userId: user._id });
    const userDTO = new AuthUserDTO({ ...user._doc, ...tokens });
    logger.info("AuthService refesh done");
    return userDTO;
  }
}

export default new AuthService();
