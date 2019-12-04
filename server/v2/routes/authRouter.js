import Router from "express";
import authController from "../controlers/authController";
import { signUp, signIn } from "../middleware/validation";
import passwordVerify from "../helper/passwordHash";

const router = Router();

router.post("/signup", signUp, authController.signup);
router.post("/signin", signIn, authController.signin);

export default router;
