import { Router } from "express";
import { getPosts, postPost } from "../controllers/postController.js";
import {validateToken} from "../middlewares/validateToken.js";
import {extractHashtags} from "../middlewares/extractHashtags.js";
import validateSchema from "../middlewares/validateSchema.js";
import postSchema from "../schemas/postSchema.js";

const postRouter = Router();

postRouter.post('/post', validateToken, validateSchema(postSchema), extractHashtags, postPost);
postRouter.get("/post", validateToken, getPosts);

export default postRouter;