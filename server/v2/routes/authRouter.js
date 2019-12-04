import Router from "express";
import authController from "../controlers/authController";
import { signUp, signIn } from "../middleware/validation";
import passwordVerify from "../helper/passwordHash";

const router = Router();

router.post("/signup", signUp, authController.signup);

export default router;
