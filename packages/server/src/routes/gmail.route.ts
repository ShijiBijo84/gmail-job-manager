import { Router } from "express";
import { getRecentEmails } from "../controllers/gmail.controller.js";

const gmailRouter = Router();


gmailRouter.get("/api/health", (req, res) => {
    res.json({ success: true, data: "server running" })
})
gmailRouter.get('/enriched', getRecentEmails)


export default gmailRouter