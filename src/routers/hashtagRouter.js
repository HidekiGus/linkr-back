import { Router } from "express";
import { postHashtag } from "../controllers/hashtagController.js";
import { validateToken } from "../middlewares/validateToken.js";
import validateSchema from "../middlewares/validateSchema.js";
import hashtagSchema from "../schemas/hashtagSchema.js";

const hashtagRouter = Router();

hashtagRouter.post('/hashtag', validateToken, validateSchema(hashtagSchema), postHashtag);

export default hashtagRouter;