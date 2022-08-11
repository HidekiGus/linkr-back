import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import postSchema from "../schemas/postSchema.js";

const postRouter = Router();

postRouter.post('/post', validateSchema(postSchema));

export default postRouter;