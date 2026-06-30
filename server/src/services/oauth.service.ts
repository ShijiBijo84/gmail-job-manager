import { google } from "googleapis"
import type { Credentials } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config()

const { GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
} = process.env

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
    throw new Error('Missing google oauth env variable')
}

export const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI
)

oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN || null,
});


export function getGoogleAuthUrl() {
    return oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: ["https://www.googleapis.com/auth/gmail.readonly"]
    })
}

export async function getGoogleToken(code: string): Promise<Credentials> {
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)
    return tokens
}

