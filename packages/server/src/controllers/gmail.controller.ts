import type { Request, Response } from "express";
import { listRecentEmails } from "../services/gmail.services.js";
import { processEmail } from "../pipelines/email.pipeline.js";

export async function getRecentEmails(req: Request, res: Response): Promise<Response> {
    try {
        const emails = await listRecentEmails();

        const enriched = await Promise.all(
            emails.map(processEmail)
        )
        return res.json({ success: true, data: enriched })
    } catch (err) {
        return res.status(500).json({ success: false, error: "Failed to process emails" })
    }
}