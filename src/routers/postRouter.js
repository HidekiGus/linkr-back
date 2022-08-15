import { Router } from "express";
import { postPost } from "../controllers/postController.js";
import validateSchema from "../middlewares/validateSchema.js";
import postSchema from "../schemas/postSchema.js";
import {validateToken} from "../middlewares/validateToken.js";

const postRouter = Router();

postRouter.post('/post', validateToken, validateSchema(postSchema), postPost);

export default postRouter;