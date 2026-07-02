import type { GmailMessageDetails, JobEmail } from "@gmail-job-manager/shared";
import { normalizeEmail } from "./normalizeEmail.js";
import { runClassificationPipeline } from "./classifyEmail.js";
import { enrichEmail } from "./enrichEmail.js";


export async function processEmail(email: GmailMessageDetails) {

    // Normalize the email
    const normalized = normalizeEmail(email)

    // Prepare AI input
    const input = {
        subject: normalized.subject,
        from: normalized.from,
        snippet: normalized.snippet,
    }

    // Classify the email using AI
    const classification = await runClassificationPipeline(input)

    // Build domain model
    const jobEmail: JobEmail = normalized

    // Return enriched email
    return enrichEmail(jobEmail, classification)

}