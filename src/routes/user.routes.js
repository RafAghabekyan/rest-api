import express from 'express';
import userController from '../controllers/user.controller.js';
import { isAuth } from '../middlewares/index.js';

const router = express.Router();

router.get('/info/:id', isAuth, userController.getUserId);
router.get('/logout', isAuth, userController.logout);

export default router;
