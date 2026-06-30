import { getRecentEmails } from "../controllers/gmail.controller.ts";
import { router } from "./router.js";

router.get('/', getRecentEmails)


export default router