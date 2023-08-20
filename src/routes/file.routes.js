import express from "express";
import { fileController } from "../controllers/index.js";
import { isAuth, upload } from "../middlewares/index.js";

const router = express.Router();

router.use("/", upload.single("files"));

router.get("/list", fileController.getFileList);

router.post("/upload", isAuth, fileController.uploadFile);

router.delete("/delete/:id", isAuth, fileController.deleteFile);

router.get("/:id", fileController.getFileById);

router.get("/download/:id", fileController.downloadFileById);

router.put("/update/:id", isAuth, fileController.updateFileById);

export default router;
