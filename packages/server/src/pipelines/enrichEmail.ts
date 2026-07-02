import type { EmailClassification, JobEmail } from "@gmail-job-manager/shared";

export function enrichEmail(email: JobEmail, classification: EmailClassification) {
    return {
        email,
        classification
    }
}