import db from "../db.js";

const { models } = db;

const findOne = async ({ userId = null }) => {
  return await models.TokensModel.findOne({ where: { userId } });
};

const invalidateToken = async ({ userId = null }) => {
  try {
    await models.TokensModel.destroy({ where: { userId } });
  } catch (error) {
    throw new Error(error);
  }
};

const createToken = async ({ userId = null, token = null }) => {
  try {
    return await models.TokensModel.create({
      userId,
      token,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  invalidateToken,
  createToken,
  findOne,
};
