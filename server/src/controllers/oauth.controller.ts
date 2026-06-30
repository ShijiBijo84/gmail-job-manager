import { getGoogleAuthUrl, getGoogleToken } from "../services/oauth.service.js";
import type { Request, Response } from "express";

export function googleAuth(req: Request, res: Response) {
    const url = getGoogleAuthUrl()
    res.redirect(url)
}

export async function googleCallBack(req: Request, res: Response) {
    const code = req.query.code as string;
    if (!code) {
        return res.status(400).json({ error: "Authorization code is missing" });
    }
    const tokens = await getGoogleToken(code);
    res.json(tokens)
}