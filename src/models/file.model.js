import Sequelize from "sequelize";

const modelName = "FilesModel";

const defineModel = (sequelize) => {
  const Files = sequelize.define(
    modelName,
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      extension: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mimeType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      size: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      uploadDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      path: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "files",
    }
  );

  return Files;
};

export default {
  modelName,
  defineModel,
};
