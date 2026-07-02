import type { GmailMessageDetails } from "@gmail-job-manager/shared";
import he from "he";

export function normalizeEmail(email: GmailMessageDetails): GmailMessageDetails {
    return {
        ...email,
        snippet: email.snippet ? he.decode(email.snippet) : "",
        from: email.from ? he.decode(email.from) : "",
        subject: email.subject ? he.decode(email.subject) : "",
    }
}