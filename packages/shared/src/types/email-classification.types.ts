export type ApplicationStatus = "applied" | "interview" | "offer" | "rejected" | "unknown"

export interface EmailClassification {
    isJobRelated: boolean;
    confidence: number;
    status: ApplicationStatus;
}