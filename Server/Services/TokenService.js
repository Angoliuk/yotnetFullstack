import TokenModel from "../Models/TokenModel.js";
import jwt from "jsonwebtoken";

class TokenService {
  async generateTokens(payload) {
    const accessToken = jwt.sign(
      {
        payload,
      },
      process.env.SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      {
        payload,
      },
      process.env.SECRET_REFRESH,
      { expiresIn: "15d" }
    );
    return { accessToken, refreshToken };
  }

  async removeToken(refreshToken) {
    const tokenData = await TokenModel.deleteOne({ refreshToken });
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
    return token;
  }

  async findToken(refreshToken) {
    const tokenData = await TokenModel.findOne({ refreshToken });
    return tokenData;
  }

  async validateAccessToken(token) {
    const userData = jwt.verify(token, process.env.SECRET);
    return userData;
  }

  async validateRefreshToken(token) {
    const userData = jwt.verify(token, process.env.SECRET_REFRESH);
    return userData;
  }

  async generateAndSaveToken(id) {
    const tokens = await generateTokens(id);
    await saveToken(id, tokens.refreshToken);
    return tokens;
  }
}

export default new TokenService();
