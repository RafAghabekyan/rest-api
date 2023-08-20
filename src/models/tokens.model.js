import Sequelize from "sequelize";

const modelName = "TokensModel";

const defineModel = (sequelize) => {
  const Tokens = sequelize.define(
    modelName,
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      token: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "tokens",
    }
  );

  return Tokens;
};

export default {
  modelName,
  defineModel,
};
