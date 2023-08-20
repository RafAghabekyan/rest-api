import db from "../db.js";

const { models } = db;

const createFile = async (fileData) => {
  try {
    return await models.FilesModel.create(fileData);
  } catch (error) {
    throw new Error(error);
  }
};

const getFileListFromDB = async (listSize, offset) => {
  try {
    return await models.FilesModel.findAll({
      limit: listSize,
      offset: offset,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const getFileById = async (id) => {
  try {
    return await models.FilesModel.findOne({ where: { id } });
  } catch (error) {
    throw new Error(error);
  }
};

const deleteFile = async (id) => {
  try {
    await models.FilesModel.destroy({ where: { id } });
  } catch (error) {
    throw new Error(error);
  }
};

const updateFileById = async ({id = null, updatedFile = {}}) => {
  try {
    return await models.FilesModel.update({ ...updatedFile }, { where: { id } });
  } catch (error) {
    throw new Error(error);
  }
};
export default {
  createFile,
  getFileListFromDB,
  getFileById,
  deleteFile,
  updateFileById,
};
