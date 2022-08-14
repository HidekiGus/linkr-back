import { Router } from "express";
import { signUp } from "../controllers/authController.js";
import { login } from "../controllers/Login/loginController.js";
import { createNewSession } from "../controllers/sessionController.js";
import { validateToken } from "../middlewares/validateToken.js";
import { pesquisa,hashtag,hashtagsTrending,buscarUsuario} from "../controllers/Timeline/search.js";
import validateSchema from "../middlewares/validateSchema.js";
import newUserSchema from "../schemas/newUserSchema.js";

const authRouter = Router();

authRouter.post('/signup', validateSchema(newUserSchema), signUp);
authRouter.post('/signin', login)
authRouter.post('/authIn', validateToken, createNewSession);
authRouter.get('/timeline', pesquisa)
authRouter.get('/hashtag', hashtag)
authRouter.get('/hashtagsTrending',hashtagsTrending)
authRouter.get('/user/:id', buscarUsuario)

export default authRouter;