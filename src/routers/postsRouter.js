import { Router } from "express";
import { getPosts } from "../controllers/postsController.js";
import {validateToken} from "../middlewares/validateToken.js"

const postsRouter = Router();

postsRouter.get("/posts", validateToken, getPosts);

export default postsRouter;