import { google } from "googleapis";
import { oauth2Client } from "./oauth.service.js";
import type { GmailMessageDetails } from "@gmail-job-manager/shared";

const gmail = google.gmail({
    version: 'v1',
    auth: oauth2Client
})

export async function listRecentEmails(): Promise<GmailMessageDetails[]> {
    const res = await gmail.users.messages.list({ userId: "me", maxResults: 10 })
    const messages = res.data.messages ?? []

    const detailedMessages = await Promise.all(
        messages.map(async (msg) => {
            const details = await gmail.users.messages.get({
                id: msg.id!,
                format: 'metadata',
                userId: "me",
                metadataHeaders: ['Subject', 'From', 'Date']
            })
            const headers = details.data.payload?.headers ?? []
            const subject = headers.find(h => h.name === 'Subject')?.value ?? null
            const from = headers.find(h => h.name === 'From')?.value ?? null
            const date = headers.find(h => h.name === 'Date')?.value ?? null
            const snippet = details.data.snippet ?? ""

            return {
                id: msg.id!,
                threadId: msg.threadId ?? "",
                subject,
                from,
                date,
                snippet
            }
        }
        ))
    return detailedMessages
}