import { getRecentEmails } from "../controllers/gmail.controller.ts";
import { router } from "./router.ts";

router.get('/enriched', getRecentEmails)


export default router