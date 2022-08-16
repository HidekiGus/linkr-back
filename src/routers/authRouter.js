import { Router } from "express";
import { login, signUp } from "../controllers/authController.js";
import { pesquisa,hashtag,hashtagsTrending,buscarUsuario} from "../controllers/Timeline/search.js";
import validateSchema from "../middlewares/validateSchema.js";
import newUserSchema from "../schemas/newUserSchema.js";
import userSchema from "../schemas/userSchema.js";

const authRouter = Router();

authRouter.post('/signup', validateSchema(newUserSchema), signUp);
authRouter.post('/signin', validateSchema(userSchema), login);
authRouter.get('/timeline', pesquisa)
authRouter.get('/hashtag', hashtag)
authRouter.get('/hashtagsTrending',hashtagsTrending)
authRouter.get('/user/:id', buscarUsuario)

export default authRouter;