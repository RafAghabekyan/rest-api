import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { tokensAdapter, userAdapter } from "../adapters/index.js";
import { PASSOWRD_HASH_SALT } from "../constants.js";
import utils from "../utils.js";

const signup = async (identifier, password) => {
  const { email, phoneNumber } = identifier;
  const hashedPassword = await bcrypt.hash(password, PASSOWRD_HASH_SALT);
  const existingUser = email
    ? await userAdapter.findUserByEmail(email)
    : await userAdapter.findUserByPhoneNumber(phoneNumber);

  if (existingUser) {
    throw new Error(`User with following credentials already exists`);
  }
  const userData = {
    email,
    phoneNumber,
    hashedPassword,
  };
  const { dataValues } = await userAdapter.signup(userData);
  const tokens = {
    bearerToken: await utils.generateBearerToken(dataValues?.id),
    refreshToken: await utils.generateRefreshToken(dataValues?.id),
  };
  await tokensAdapter.createToken({
    userId: dataValues.id,
    token: tokens.bearerToken,
  });
  return tokens;
};

const signin = async (email, phoneNumber, password) => {
  try {
    const user = email
      ? await userAdapter.findUserByEmail(email)
      : await userAdapter.findUserByPhoneNumber(phoneNumber);
    if (!user) {
      throw new Error("User not found");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }
    const tokens = {
      bearerToken: await utils.generateBearerToken(user.id),
      refreshToken: await utils.generateRefreshToken(user.id),
    };
    await tokensAdapter.createToken({
      userId: user.id,
      token: tokens.bearerToken,
    });
    return tokens;
  } catch (error) {
    throw new Error(error);
  }
};

const refreshBearerToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!decoded || !decoded.id) {
      throw new Error("Invalid refresh token");
    }
    const user = await userAdapter.findUserById({ id: decoded.id });
    if (!user) {
      throw new Error("User not found");
    }
    const bearerToken = await utils.generateBearerToken(user.id);
    await tokensAdapter.createToken({ userId: user.id, token: bearerToken });
    return {
      bearerToken,
      refreshToken: await utils.generateRefreshToken(user.id),
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  signup,
  signin,
  refreshBearerToken,
};
