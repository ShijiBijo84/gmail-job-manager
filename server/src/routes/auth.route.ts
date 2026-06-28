import { Router } from "express";
import { googleAuth, googleCallBack } from "../controllers/oauth.controller.ts";

const router = Router()

router.get('/google', googleAuth)
router.get('/google/callback', googleCallBack)

export default router