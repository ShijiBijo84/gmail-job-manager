import { getRecentEmails } from "../controllers/gmail.controller.js";
import { router } from "./router.js";

router.get('/enriched', getRecentEmails)


export default router