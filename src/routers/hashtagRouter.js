import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";

const hashtagRouter = Router();

hashtagRouter.post('/hashtag', validateToken);

export default hashtagRouter;