import express from "express";
import cors from "cors";
import { authRouter, fileRouter, userRouter } from "./routes/index.js";

const listenApp = (app) => {
  return new Promise((resolve, reject) => {
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server is running on port ${process.env.SERVER_PORT}.`);
      resolve();
    });
  });
};

async function initApp() {
  const corsOptions = {
    origin: process.env.CORS_ORIGIN,
  };
  const app = express();
  app.use(cors(corsOptions));

  app.use(express.json());
  app.use("/auth", authRouter);
  app.use("/file", fileRouter);
  app.use("/", userRouter);
  await listenApp(app);
}

export default initApp;
