import type { EmailClassification } from "./email-classification.types";
import type { JobEmail } from "./job-email.types";

export type EnrichedEmail = {
    email: JobEmail;
    classification: EmailClassification;
}