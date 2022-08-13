import { Router } from "express";
import { postHashtag } from "../controllers/hashtagController.js";
import { validateToken } from "../middlewares/validateToken.js";

const hashtagRouter = Router();

hashtagRouter.post('/hashtag', validateToken, postHashtag);

export default hashtagRouter;