/* eslint-disable node/no-unsupported-features/es-syntax */
import Router from 'express';
import authController from '../controlers/authController';
import {signUp,signIn} from '../middleware/validation';

const router = Router();

router.post('/signup',signUp, authController.signup);
router.post('/signin',signIn, authController.signin);

export default router;
