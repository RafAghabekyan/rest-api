import express from "express";

import { authController } from "../controllers/index.js";
import { authValidator } from "../validators/index.js";

const router = express.Router();

router.post("/signup", authValidator.validateSignupData, authController.signup);

router.post("/signin", authValidator.validateSignupData, authController.signin);

router.post(
  "/signin/new_token",
  authValidator.validateNewToken,
  authController.refreshBearerToken
);

export default router;
