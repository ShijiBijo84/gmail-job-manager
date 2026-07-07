
import { Router } from "express";
import { googleAuth, googleCallBack } from "../controllers/oauth.controller.js";

const authRouter = Router();

authRouter.get('/google', googleAuth)
authRouter.get('/google/callback', googleCallBack)

export default authRouter