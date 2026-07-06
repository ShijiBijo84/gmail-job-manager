import type { EmailClassification } from "@gmail-job-manager/shared";
import type { ClassifyEmailInput } from "../../types/ai.types.js";

export interface AIProvider {
    classifyEmail(emailText: ClassifyEmailInput): Promise<
        EmailClassification>;
}