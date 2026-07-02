import type { EnrichedEmail } from "@gmail-job-manager/shared";

export type EnrichedEmailResponse = {
    success: boolean;
    data: EnrichedEmail[];
};