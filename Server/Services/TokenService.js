import TokenModel from "../Models/TokenModel.js";
import jwt from "jsonwebtoken";
import { logger } from "../Logs/Logger.js";

class TokenService {
  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "15s",
    });
    const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH, {
      expiresIn: "15d",
    });
    logger.info("TokenService generateTokens done");
    return { accessToken, refreshToken };
  }

  async removeToken(refreshToken) {
    const tokenData = await TokenModel.deleteOne({ refreshToken });
    logger.info("TokenService removeToken done");
    return tokenData;
  }

  async saveToken(userId, refreshToken) {
    //only for one user
    const tokenData = await TokenModel.findOne({ userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = TokenModel.create({ userId, refreshToken });
    logger.info("TokenService saveToken done");
    return token;
  }

  async findToken(refreshToken) {
    const tokenData = await TokenModel.findOne({ refreshToken });
    logger.info("TokenService findToken done");
    return tokenData;
  }

  async validateAccessToken(token) {
    const userData = jwt.verify(token, process.env.SECRET);
    logger.info("TokenService validateAccessToken done");
    return userData;
  }

  async validateRefreshToken(token) {
    const userData = jwt.verify(token, process.env.SECRET_REFRESH);
    logger.info("TokenService validateRefreshToken done");
    return userData;
  }

  async generateAndSaveToken(userId) {
    const tokens = await this.generateTokens({ userId });
    await this.saveToken(userId, tokens.refreshToken);
    logger.info("TokenService generateAndSaveToken done");
    return tokens;
  }
}

export default new TokenService();
