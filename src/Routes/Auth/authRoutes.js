import { Router } from "express";
import AuthController from "../../Controllers/Auth/authController.js";
import AuthValidators from "../../Validators/validation.js";

const authRouter = Router();
authRouter.post("/auth/signUp", AuthController.signUp);
authRouter.post("/auth/signIn", AuthValidators.signIn, AuthController.signIn);

export default authRouter;
