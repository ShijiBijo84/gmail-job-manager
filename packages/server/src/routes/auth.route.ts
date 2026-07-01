
import { googleAuth, googleCallBack } from "../controllers/oauth.controller.js";
import { router } from "./router.js";

router.get('/google', googleAuth)
router.get('/google/callback', googleCallBack)

export default router