import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import {
  JWT_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
} from "./constants.js";

const getFilePath = (filename) =>
  path.join(global.rootDir, filename);

const generateBearerToken = async (userId) => {
  if (userId) {
    return jwt.sign(
      { id: userId },
      process.env.JWT_SECRET,
      {
        expiresIn: JWT_TOKEN_EXPIRATION,
      }
    );
  } else {
    throw new Error("UserId is not valid");
  }
};

const generateRefreshToken = async (userId) => {
  if (userId) {
    return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    });
  } else {
    throw new Error("UserId is not valid");
  }
};

const getExtension = (filename) => filename.split(".").pop();

const deleteFileFromStorage = (filename) => {
  const filePath = getFilePath(filename);
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (error) => {
      if (error) {
        reject(new Error(error));
      } else {
        resolve();
      }
    });
  });
};

export default {
  generateBearerToken,
  generateRefreshToken,
  getExtension,
  deleteFileFromStorage,
  getFilePath,
};
