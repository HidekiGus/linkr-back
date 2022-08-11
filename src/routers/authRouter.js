import { Router } from "express";
import { signUp } from "../controllers/authController.js";
import { login } from "../controllers/Login/loginController.js";
import validateSchema from "../middlewares/validateSchema.js";
import newUserSchema from "../schemas/newUserSchema.js";

const authRouter = Router();

authRouter.post('/signup', validateSchema(newUserSchema), signUp);
authRouter.post('/signin', login)
authRouter.post('/authIn', validateToken, createNewSession);
export default authRouter;