import Sequelize from "sequelize";
import models from "./models/index.js";

class Database {
  sequelize = {};
  models = {};

  async initDb() {
    this.sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
      }
    );
    await this.sequelize.authenticate();
    console.log("Connection with DB has been established successfully.");
  }

  defineModels(models) {
    models.forEach(
      ({ modelName, defineModel }) =>
        (this.models[modelName] = defineModel(this.sequelize))
    );
  }

  async connectDb() {
    await this.initDb();
    this.defineModels(models);
  }
}

export default new Database();
