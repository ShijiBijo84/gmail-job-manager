import type { Request, Response } from "express";
import { listRecentEmails } from "../services/gmail.services.js";

export async function getRecentEmails(req: Request, res: Response): Promise<Response> {
    const emailList = await listRecentEmails();
    return res.json({ success: true, data: emailList });
}