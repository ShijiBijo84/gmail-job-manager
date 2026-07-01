import { getRecentEmails } from "../controllers/gmail.controller.ts";
import { router } from "./router.js";

router.get('/enriched', getRecentEmails)


export default router