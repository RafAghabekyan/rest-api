import db from "./src/db.js";
import dotenv from "dotenv";

dotenv.config();

async function initDb() {
  try {
    await db.connectDb();
    const { models } = db;
    for (let model in models) {
      console.log(
        `---------------Start creating the ${model} table---------------`
      );
      await models[model].sync();
      console.log(
        `---------------The ${model} table created successfully---------------`
      );
    }
    process.exit(0)
  } catch (err) {
    process.exit(1);
  }
}

initDb();
