import type { EmailClassification } from "./email-classification.types.ts";
import type { JobEmail } from "./job-email.types.ts";

export type EnrichedEmail = {
    email: JobEmail;
    classification: EmailClassification;
}