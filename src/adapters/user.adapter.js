import db from "../db.js";

const { models } = db;

const signup = async ({
  email = null,
  phoneNumber = null,
  hashedPassword = null,
}) => {
  try {
    return await models.UsersModel.create({
      email,
      phoneNumber,
      password: hashedPassword,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const findUserByEmail = async (email) => {
  try {
    return await models.UsersModel.findOne({ where: { email } });
  } catch (error) {
    throw new Error(error);
  }
};

const findUserByPhoneNumber = async (phoneNumber) => {
  try {
    return await models.UsersModel.findOne({ where: { phoneNumber } });
  } catch (error) {
    throw new Error(error);
  }
};

const findUserById = async ({ id = null }) => {
  try {
    return await models.UsersModel.findOne({ where: { id } });
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  signup,
  findUserByEmail,
  findUserByPhoneNumber,
  findUserById,
};
