import { Router } from "express";
import { getPosts, postPost } from "../controllers/postController.js";
import validateSchema from "../middlewares/validateSchema.js";
import postSchema from "../schemas/postSchema.js";
import {validateToken} from "../middlewares/validateToken.js"

const postRouter = Router();

postRouter.post('/post', validateToken, validateSchema(postSchema), postPost);
postRouter.get("/posts", getPosts);

export default postRouter;