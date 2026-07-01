
import { googleAuth, googleCallBack } from "../controllers/oauth.controller.ts";
import { router } from "./router.ts";

router.get('/google', googleAuth)
router.get('/google/callback', googleCallBack)

export default router