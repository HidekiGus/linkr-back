import { Router } from "express";
import { signUp } from "../controllers/authController.js";
import validateSchema from "../middlewares/validateSchema.js";
import newUserSchema from "../schemas/newUserSchema.js";

const authRouter = Router();

authRouter.post('/signup', validateSchema(newUserSchema), signUp);

export default authRouter;