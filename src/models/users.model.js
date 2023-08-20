import Sequelize from "sequelize";

const modelName = 'UsersModel';

const defineModel = (sequelize) => {
  const Users = sequelize.define(
    modelName,
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'users',
    },
  );

  return Users;
};

export default {
  modelName,
  defineModel,
}
