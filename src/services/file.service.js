import { fileAdapter } from "../adapters/index.js";
import utils from "../utils.js";

const uploadFile = async (fileData) => {
  try {
    const { filename, path } = fileData;
    const file = {
      name: filename,
      extension: utils.getExtension(filename),
      mimeType: fileData.mimetype,
      size: fileData.size,
      uploadDate: new Date(),
      path,
    };
    return await fileAdapter.createFile(file);
  } catch (error) {
    throw new Error(error);
  }
};

const fetchFileList = async (listSize, page) => {
  try {
    const offset = (page - 1) * listSize;
    return await fileAdapter.getFileListFromDB(listSize, offset);
  } catch (error) {
    throw new Error(error);
  }
};

const deleteFile = async (id) => {
  try {
    const file = await fileAdapter.getFileById(id);
    if (!file) {
      throw new Error("File not found");
    }
    await fileAdapter.deleteFile(id);
    await utils.deleteFileFromStorage(file.path);
  } catch (error) {
    throw new Error(error);
  }
};

const getFileById = async (id) => {
  try {
    return await fileAdapter.getFileById(id);
  } catch (error) {
    throw new Error("Failed to retrieve the file from the database");
  }
};

const updateFile = async (id, file) => {
  try {
    const oldFile = await fileAdapter.getFileById(id);
    if (!oldFile) {
      throw new Error("File that should be updated not found");
    }
    await utils.deleteFileFromStorage(oldFile.path);
    const updatedFile = {
      name: file.originalName,
      path: file.path,
    }
    return await fileAdapter.updateFileById({id, updatedFile})
  } catch (error) {
    throw new Error("Failed to update the file in the database");
  }
};

export default {
  uploadFile,
  fetchFileList,
  deleteFile,
  getFileById,
  updateFile,
};
