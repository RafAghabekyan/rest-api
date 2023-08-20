import dotenv from "dotenv";
import utils from "./utils.js";
import initApp from "./src/app.js";
import db from "./src/db.js";

dotenv.config();

global.rootDir = utils.getRootDir();

async function main() {
  await db.connectDb();
  await initApp();
}

main();
