import type { EmailClassification } from "../../../shared/src/types/email-classification.types";
import type { JobEmail } from "../../../shared/src/types/job-email.types";

export type EnrichedEmail = {
    email: JobEmail;
    classification: EmailClassification;
}