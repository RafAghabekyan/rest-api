import userAdapter from "../adapters/user.adapter.js";
import tokensAdapter from "../adapters/tokens.adapter.js";

const getUserId = async (id) => {
  try {
    return await userAdapter.findUserById({ id });
  } catch (error) {
    throw new Error("Failed to retrieve user ID from the adapter");
  }
};

const invalidateToken = async (userId) => {
  try {
    return await tokensAdapter.invalidateToken({ userId });
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  getUserId,
  invalidateToken,
};
