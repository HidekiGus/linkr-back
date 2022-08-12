import {Router} from "express";
import authRouter from "./authRouter.js";
import hashtagRouter from "./hashtagRouter.js";
import postRouter from "./postRouter.js";

const router = Router();

router.use(authRouter);
router.use(postRouter);
router.use(hashtagRouter);

export default router;