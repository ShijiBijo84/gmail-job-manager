import type { Request, Response } from "express";
import { listRecentEmails } from "../services/gmail.services.ts";
import { classifyEmail } from "../services/ai.service.ts";
import type { ClassifyEmailInput } from "../types/ai.types.ts";


export async function getRecentEmails(req: Request, res: Response): Promise<Response> {
    try {
        const emails = await listRecentEmails();

        const enriched = await Promise.all(
            emails.map(async (email) => {
                const input: ClassifyEmailInput = {
                    subject: email.subject,
                    from: email.from,
                    snippet: email.snippet,
                }
                const classification = await classifyEmail(input)
                return { email, classification }
            })
        )
        return res.json({ success: true, data: enriched })
    } catch (err) {
        return res.status(500).json({ success: false, error: "Failed to process emails" })
    }


}