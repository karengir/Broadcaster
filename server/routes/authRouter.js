/* eslint-disable node/no-unsupported-features/es-syntax */
import Router from 'express';
import authController from '../controlers/authController';
import signUp from '../middleware/validation';

const router = Router();

router.post('/signup',signUp, authController.signup);

export default router;
