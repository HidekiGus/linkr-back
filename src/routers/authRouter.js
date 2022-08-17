import { Router } from "express";
import { login, signUp } from "../controllers/authController.js";
import validateSchema from "../middlewares/validateSchema.js";
import newUserSchema from "../schemas/newUserSchema.js";
import userSchema from "../schemas/userSchema.js";

const authRouter = Router();

authRouter.post('/signup', validateSchema(newUserSchema), signUp);
authRouter.post('/signin', validateSchema(userSchema), login);

export default authRouter;