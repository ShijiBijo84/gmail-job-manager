import type { ApplicationStatus, EnrichedEmail } from "@gmail-job-manager/shared";

export type EnrichedEmailResponse = {
    success: boolean;
    data: EnrichedEmail[];
};

export type StatusFilter = ApplicationStatus | "all";

export type StatusCounts = Record<ApplicationStatus, number> & { all: number };